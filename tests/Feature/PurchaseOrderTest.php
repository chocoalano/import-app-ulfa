<?php

namespace Tests\Feature;

use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderDetail;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PurchaseOrderTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function store_endpoint_creates_header_and_details()
    {
        // prepare a supplier and an authenticated user
        $supplier = Supplier::factory()->create();
        $user = User::factory()->create();

        $payload = [
            'VendAccount' => $supplier->id,
            'PurchId' => 'TEST-001',
            'createdDateTime' => '2026-02-21',
            'incoterm' => 'EXW',
            'expected_delivery_date' => '2026-03-01',
            'expected_arrival_date' => '2026-03-05',
            'notes' => 'Sample po',
            'items' => [
                ['ItemId' => 'I1', 'Name' => 'Widget', 'PurchQty' => 10, 'unit' => 'pcs'],
                ['ItemId' => 'I2', 'Name' => 'Gadget', 'PurchQty' => 5, 'unit' => 'pcs'],
            ],
        ];

        $response = $this->actingAs($user)
            ->post(route('purchaseOrder.store'), $payload);

        $response->assertRedirect(route('purchaseOrder.index'));
        $this->assertDatabaseHas('purchase_orders', [
            'PurchId' => 'TEST-001',
            'VendAccount' => $supplier->id,
        ]);

        $po = PurchaseOrder::where('PurchId', 'TEST-001')->first();

        $this->assertNotNull($po);
        $this->assertEquals(15, $po->total_qty);

        $this->assertDatabaseHas('purchase_order_details', [
            'PurchId' => $po->id,
            'ItemId' => 'I1',
            'Name' => 'Widget',
            'PurchQty' => 10,
        ]);
        $this->assertDatabaseHas('purchase_order_details', [
            'PurchId' => $po->id,
            'ItemId' => 'I2',
            'Name' => 'Gadget',
            'PurchQty' => 5,
        ]);
    }
}
