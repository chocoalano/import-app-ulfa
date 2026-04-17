<?php

namespace App\Http\Controllers;

use App\Models\Invoice;
use App\Models\PurchaseOrder;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $invoices = Invoice::with('supplier', 'purchaseOrders')
            ->latest()
            ->get()
            ->map(fn($invoice) => [
                'id'                      => $invoice->id,
                'supplier_id'             => $invoice->supplier_id,
                'supplier_name'           => $invoice->supplier->name,
                'invoice_number'          => $invoice->invoice_number,
                'po_numbers'              => $invoice->purchaseOrders->pluck('po_number')->toArray(),
                'status'                  => $invoice->status,
                'total_qty'               => $invoice->total_qty,
                'incoterm'                => $invoice->incoterm,
                'expected_delivery_date'  => $invoice->expected_delivery_date?->toDateString(),
                'expected_arrival_date'   => $invoice->expected_arrival_date?->toDateString(),
                'notes'                   => $invoice->notes,
            ]);

        return Inertia::render('invoice/index', [
            'invoices' => $invoices,
            'title' => 'Invoice List',
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $purchaseOrders = PurchaseOrder::select(
            'id',
            'po_number',
            'supplier_id'
        )->get();
        $supplier = Supplier::select(
            'id',
            'name'
        )->get()->keyBy('id');
        

        return Inertia::render('invoice/create', [
            'supplier' => $supplier,
            'purchaseOrders' => $purchaseOrders,
            'title' => 'Create Invoice',
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            // contoh (sesuaikan tabel)
            'invoice_number' => 'required|string|unique:invoices,invoice_number',
            'supplier_id'    => 'required|exists:suppliers,id',
            'invoice_date'   => 'required|date',
        ]);

        $invoice = Invoice::create($validated);

        $invoice->purchaseOrders()->attach($request->purchase_order_ids);

        return redirect()
            ->route('invoice.index')
            ->with('success', 'Invoice created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Invoice $invoice)
    {
        $invoice->load('details');

        return Inertia::render('invoice/show', [
            'title'     => 'Invoice Detail',
            'invoice'   => $invoice,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Invoice $invoice)
    {
        return Inertia::render('invoice/edit', [
            'title'   => 'Edit Invoice',
            'invoice' => $invoice,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Invoice $invoice)
    {
        $validated = $request->validate([
            'invoice_number' => 'required|string|unique:invoices,invoice_number,' . $invoice->id,
            'supplier_id'    => 'required|exists:suppliers,id',
            'invoice_date'   => 'required|date',
        ]);

        $invoice->update($validated);

        return redirect()
            ->route('invoice.show', $invoice)
            ->with('success', 'Invoice updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invoice $invoice)
    {
        $invoice->delete();

        return redirect()
            ->route('invoice.index')
            ->with('success', 'Invoice deleted');
    }
}
