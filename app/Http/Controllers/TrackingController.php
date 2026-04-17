<?php

namespace App\Http\Controllers;

use App\Models\PurchaseOrder;
use App\Models\Invoice;
use App\Models\Shipping;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;

class TrackingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return inertia('Tracking');
    }

    public function tracking(Request $request)
    {
        $shipments = Shipping::with(['invoice.details'])
            ->where('po_number', $request->keyword)
            ->get();

        return Inertia::render('Tracking', [
            'shipments' => $shipments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }


    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $request->validate([
            'keyword' => 'required|string',
        ]);

        $keyword = trim($request->keyword);

        // ========================
        // 1. Cek Purchase Order
        // ========================
        $shipping = Shipping::where(['po_number', 'invoice_number', 'bl_number'], 'like', "%{$keyword}%")
            ->orWhere('id', $keyword)
            ->first();

        if ($shipping) {
            return redirect()->route('tracking', [
                'type' => 'shipping',
                'id' => $shipping->id,
            ]);
        }
        $request->validate([
            'keyword' => 'required|string',
        ]);

        $keyword = trim($request->keyword);

        // ========================
        // 1. Cek Purchase Order
        // ========================
        // $purchaseOrder = PurchaseOrder::where('po_number', 'like', "%{$keyword}%")
        //     ->orWhere('id', $keyword)
        //     ->first();

        // if ($purchaseOrder) {
        //     return redirect()->route('tracking', [
        //         'type' => 'po',
        //         'id' => $purchaseOrder->id,
        //     ]);
        // }

        // ========================
        // 2. Cek Invoice
        // ========================
        // $invoice = Invoice::where('invoice_number', 'like', "%{$keyword}%")
        //     ->orWhere('id', $keyword)
        //     ->first();

        // if ($invoice) {
        //     return redirect()->route('tracking', [
        //         'type' => 'invoice',
        //         'id' => $invoice->id,
        //     ]);
        // }

        // ========================
        // 3. HIT API EXTERNAL (POST)
        // ========================
        // try {
        // $data_post=[
        //     'carrierBookingReference' => $invoice->bl_number ?? null,
        //     'transportDocumentReference' => '260029935',
        //     'equipmentReference' => 'APZU4812090',
        //     'eventType' => 'SHIPMENT,EQUIPMENT',
        //     'eventCreatedDateTime' => 'gte:2021-04-01T00:00:00Z',
        //     'shipmentEventTypeCode' => 'RECE,DRFT',
        //     'documentTypeCode' => 'CBR,TRD',
        //     'transportEventTypeCode' => 'ARRI,DEPA',
        //     'vesselIMONumber' => '9321483',
        //     'exportVoyageNumber' => '2103S',
        //     'carrierServiceCode' => 'FE1',
        //     'UNLocationCode' => 'FRPAR',
        //     'equipmentEventTypeCode' => 'GTIN,GTOT',
        //     'limit' => '100',
        //     'cursor' => '1',
        //     'sort' => 'eventType:DESC, equipmentReference:DESC, eventDateTime:ASC',
        // ];
        // $ceisa = Http::timeout(10)
        //     ->acceptJson()
        //     ->post(config('services.tracking_api.ceisa'), [
        //         'keyword' => $keyword,
        //     ]);
        // $shipper = Http::timeout(10)
        //     ->acceptJson()
        //     ->post(config('services.tracking_api.shipper'), [
        //         'keyword' => $keyword,
        //     ]);

        // if ($ceisa->successful() && $ceisa->json('status') === true) {
        //     return redirect()->route('tracking', [
        //         'type' => $ceisa->json('type'),
        //         'id'   => $ceisa->json('id'),
        //     ]);
        // }
        // if ($shipper->successful() && $shipper->json('status') === true) {
        //     return redirect()->route('tracking', [
        //         'type' => $shipper->json('type'),
        //         'id'   => $shipper->json('id'),
        //     ]);
        // }
        // } 
        //     catch (\Exception $e) {
        //     // Optional: log error API
        //     logger()->error('Tracking API Error', [
        //         'message' => $e->getMessage(),
        //     ]);
        // }

        // ========================
        // 4. TIDAK DITEMUKAN
        // ========================
        // return back()
        //     ->withInput()
        //     ->withErrors([
        //         'keyword' => 'Data tracking tidak ditemukan. Coba gunakan PO Number atau Invoice Number yang lain.',
        //     ]);

    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $shipment = Shipping::with(['purchaseOrderDetails', 'purchaseOrder'])
            ->findOrFail($id);
        return inertia('Tracking/Detail', [
            'shipment' => $shipment,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
