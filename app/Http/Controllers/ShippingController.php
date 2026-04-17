<?php

namespace App\Http\Controllers;

use App\Models\Shipping;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ShippingController extends Controller
{
    public function index()
    {
        $shipments = Shipping::all();

        return Inertia::render('Tracking', [
            'shipments' => $shipments,
        ]);
        // return response()->json($shipments);
    }
    public function show($id)
    {
        $shipment = Shipping::findOrFail($id);
        return response()->json($shipment);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'purchase_order_id' => 'required|exists:purchase_orders,id',
            'invoice_id' => 'nullable|exists:invoices,id',
            'supplier_id' => 'required|exists:suppliers,id',
            'custom_reference' => 'nullable|string|max:255',
            'nomor_respon' => 'nullable|string|max:255',
            'kode_respon' => 'nullable|string|max:255',
            'bl_number' => 'nullable|string|max:255',
            'pol' => 'nullable|string|max:255',
            'pod' => 'nullable|string|max:255',
            'etd' => 'nullable|date',
            'eta' => 'nullable|date',
            'trucking_date' => 'nullable|date',
            'carrier' => 'nullable|string|max:255',
            'container_number' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:100',
            'estimated_arrival' => 'nullable|date',
            'notes' => 'nullable|string',
        ]);

        $shipment = Shipping::create($validated);
        return response()->json($shipment, 201);
    }
    public function update(Request $request, $id)
    {
        $shipment = Shipping::findOrFail($id);

        $validated = $request->validate([
            'purchase_order_id' => 'sometimes|required|exists:purchase_orders,id',
            'invoice_id' => 'sometimes|nullable|exists:invoices,id',
            'supplier_id' => 'sometimes|required|exists:suppliers,id',
            'custom_reference' => 'sometimes|nullable|string|max:255',
            'nomor_respon' => 'sometimes|nullable|string|max:255',
            'kode_respon' => 'sometimes|nullable|string|max:255',
            'bl_number' => 'sometimes|nullable|string|max:255',
            'pol' => 'sometimes|nullable|string|max:255',
            'pod' => 'sometimes|nullable|string|max:255',
            'etd' => 'sometimes|nullable|date',
            'eta' => 'sometimes|nullable|date',
            'trucking_date' => 'sometimes|nullable|date',
            'carrier' => 'sometimes|nullable|string|max:255',
            'container_number' => 'sometimes|nullable|string|max:255',
            'status' => 'sometimes|nullable|string|max:100',
            'estimated_arrival' => 'sometimes|nullable|date',
            'notes' => 'sometimes|nullable|string',
        ]);

        $shipment->update($validated);
        return response()->json($shipment);
    }
    public function destroy($id)
    {
        $shipment = Shipping::findOrFail($id);
        $shipment->delete();
        return response()->json(null, 204);
    }

    public function search(Request $request)
{
    $request->validate([
        'keyword' => 'required|string'
    ]);

    $keyword = $request->keyword;

    $shipments = Shipping::with([
        'purchaseOrder',
        'invoice.details' // <-- ini penting
    ])
    ->where(function ($query) use ($keyword) {
        $query->where('bl_number', $keyword)
            ->orWhere('container_number', $keyword)
            ->orWhere('nomor_respon', $keyword)
            ->orWhereHas('purchaseOrder', function ($q) use ($keyword) {
                $q->where('po_number', $keyword);
            })
            ->orWhereHas('invoice', function ($q) use ($keyword) {
                $q->where('invoice_number', $keyword);
            });
    })
    ->get();


    return Inertia::render('Tracking', [
        'shipments' => $shipments
    ]);
}

}
