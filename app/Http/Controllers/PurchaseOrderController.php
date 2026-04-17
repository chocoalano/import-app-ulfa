<?php

namespace App\Http\Controllers;

use App\Exports\PurchaseOrderTemplateExport;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\PurchaseOrderImport;
use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderDetail;
use App\Models\Supplier;
use App\Notifications\ImportHasFailedNotification;
use Illuminate\Database\QueryException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class PurchaseOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // PurchaseOrderController.php
    public function index()
    {
        $purchaseOrders = PurchaseOrder::with('supplier')
            ->latest()
            ->get()
            ->map(fn($po) => [
                'id'                     => $po->id,
                'ItemId'              => $po->ItemId,
                'order_date'             => optional($po->order_date)->format('Y-m-d'),
                'status'                 => $po->status,
                'incoterm'               => $po->incoterm,
                'total_qty'              => $po->purchaseOrderDetails()->sum('quantity'),
                'expected_delivery_date' => $po->expected_delivery_date,
                'supplier_name'          => $po->supplier?->name,
            ]);

        return Inertia::render('po/index', [
            'title'          => 'Purchase Order List',
            'purchaseOrders' => $purchaseOrders,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $supplier = Supplier::select('id', 'name')->get();
        return Inertia::render('po/create', [
            'title' => 'Create Purchase Order',
            'supplier' => $supplier,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // debugging helper: log incoming payload
        Log::debug('PO store payload', $request->all());

        $request->validate([
            'VendAccount'            => 'required|exists:suppliers,id',
            'PurchId'                => 'required|string|unique:purchase_orders,ItemId',
            'createdDateTime'        => 'nullable|date',
            'incoterm'               => 'nullable|string',
            'DeliveryDate'           => 'nullable|date',
            'expected_arrival_date'  => 'nullable|date',
            'notes'                  => 'nullable|string',
            'total_qty'              => 'nullable|numeric|min:0',
            'items'                  => 'required|array|min:1',
            'items.*.ItemId'    => 'required|string',
            'items.*.Name'           => 'required|string',
            'items.*.PurchQty'       => 'required|numeric|min:1',
            'items.*.PurchUnit'      => 'required|string',
            'items.*.hs_code'        => 'nullable|string',
        ], [
            'ItemId.unique' => 'PO Number sudah digunakan. Silakan gunakan nomor lain.',
        ]);

        try {
            DB::beginTransaction();

            // create the header record, include total_qty if present
            $poData = [
                'VendAccount'            => $request->VendAccount,
                'PurchId'                => $request->ItemId,
                'createdDateTime'        => $request->order_date,
                'incoterm'               => $request->incoterm,
                'DeliveryDate'           => $request->expected_delivery_date,
                'expected_arrival_date'  => $request->expected_arrival_date,
                'notes'                  => $request->notes,
                'status'                 => 'draft',
            ];

            if ($request->filled('total_qty')) {
                $poData['total_qty'] = $request->total_qty;
            }

            $po = PurchaseOrder::create($poData);

            // insert details in bulk for efficiency
            $details = collect($request->items)->map(function ($item) {
                return [
                    'ItemId' => $item['ItemId'],
                    'Name'   => $item['Name'],
                    'PurchQty'    => $item['quantity'],
                    'PurchUnit'        => $item['unit'],
                    'hs_code'     => $item['hs_code'] ?? null,
                ];
            })->toArray();

            $po->purchaseOrderDetails()->createMany($details);

            // recalc total_qty based on inserted details if not provided
            if (! $request->filled('total_qty')) {
                $po->total_qty = collect($details)->sum('quantity');
                $po->save();
            }

            DB::commit();

            return redirect()
                ->route('po.index')
                ->with('success', 'Purchase Order created successfully');
        } catch (QueryException $e) {
            DB::rollBack();

            // fallback kalau duplicate lolos validation (race condition)
            if ($e->errorInfo[1] == 1062) {
                return back()
                    ->withInput()
                    ->withErrors([
                        'ItemId' => 'PO Number sudah digunakan. Silakan gunakan nomor lain.',
                    ]);
            }

            Log::error('Failed to create Purchase Order: ' . $e->getMessage());

            return back()
                ->withInput()
                ->with('error', 'Terjadi kesalahan saat menyimpan data.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    { //po/pages
        return Inertia::render('po/show', [
            'title' => 'Show Purchase Order',
            'poId' => $id,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $po = PurchaseOrder::with('items')->findOrFail($id);
        //po/pages
        return Inertia::render('po/edit', [
            'title' => 'Edit Purchase Order',
            'po' => [
                ...$po->toArray(),
                'items' => $po->items,
            ],
            'supplier' => Supplier::select('id', 'name')->get(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $po = PurchaseOrder::findOrFail($id); // ✅ ambil model dulu

        $validated = $request->validate([
            'VendAccount'            => 'required|exists:suppliers,id',
            'ItemId'              => 'required|string|unique:purchase_orders,ItemId,' . $po->id,
            'createdDateTime'             => 'nullable|date',
            'incoterm'               => 'nullable|string',
            'DeliveryDate' => 'nullable|date',
            'expected_arrival_date'  => 'nullable|date',
            'notes'                  => 'nullable|string',
            'total_qty'              => 'nullable|numeric|min:0',
            'status'                 => 'required|string|in:draft,processing,shipped,paid,cancelled',
            'items'                  => 'required|array|min:1',
            'items.*.id'             => 'nullable|exists:purchase_order_details,id',
            'items.*.ItemId'    => 'required|string',
            'items.*.Name'      => 'required|string',
            'items.*.PurchQty'       => 'required|numeric|min:1',
            'items.*.PurchUnit'           => 'required|string',
            'items.*.hs_code'        => 'nullable|string',
        ], [
            'ItemId.unique' => 'PO Number sudah digunakan. Silakan gunakan nomor lain.',
        ]);

        // update purchase order
        $po->update($validated);

        // hapus item lama
        $po->items()->delete();

        // buat ulang item
        $po->items()->createMany($validated['items']);

        return redirect('/po')->with('success', 'Update Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,csv',
        ]);
        try {
            Excel::import(
                new PurchaseOrderImport($request->user()),
                $request->file('file')
            );
            return back()->with('success', 'Purchase Order imported successfully');
        } catch (\Throwable $e) {

            // log error (penting!)
            Log::error('PO Import Failed', [
                'error' => $e->getMessage(),
            ]);

            // kirim notifikasi
            $request->user()->notify(
                new ImportHasFailedNotification($e->getMessage())
            );

            return back()->withErrors([
                'import' => 'Import gagal: ' . $e->getMessage(),
            ]);
        }
    }

    public function exportTemplate()
    {
        return Excel::download(
            new PurchaseOrderTemplateExport,
            'purchase-order-template.xlsx'
        );
    }
}
