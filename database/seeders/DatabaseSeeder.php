<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Supplier;
use App\Models\PurchaseOrder;
use App\Models\Invoice;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $user = User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'email' => 'test@gmail.test',
                'nik' => '123456',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        // Create Supplier
        $supplier = Supplier::firstOrCreate(
            ['name' => 'Test Supplier'],
            [
                'VendAccount' => 'SUPP-001',
                'MarkupGroup' => 'china',
                'ItemBuyerGroupId' => 'import',
                'phone' => '081234567890',
                'address' => 'Test Address',
            ]
        );

        // Create Test PurchaseOrder
        // $po = PurchaseOrder::firstOrCreate(
        //     ['po_number' => 'PO-TEST-001'],
        //     [
        //         'id' => '001',
        //         'supplier_id' => $supplier->id,
        //         'status' => 'pending',
        //         'total_qty' => 1000,
        //         'incoterm' => 'FOB',
        //         'expected_delivery_date' => now()->addDays(30),
        //         'expected_arrival_date' => now()->addDays(45),
        //         'notes' => 'Test Purchase Order',
        //     ]
        // );

        // Create Test Invoice
        // $invoice = Invoice::firstOrCreate(
        //     ['invoice_number' => 'INV-TEST-001'],
        //     [
        //         'supplier_id' => $supplier->id,
        //         'purchase_orders_id' => $po->id,
        //         'po_numbers' => 'PO-TEST-001',
        //         'status' => 'pending',
        //         'total_qty' => 1000,
        //         'incoterm' => 'FOB',
        //         'expected_delivery_date' => now()->addDays(30),
        //         'expected_arrival_date' => now()->addDays(45),
        //         'notes' => 'Test Invoice',
        //     ]
        // );
    }
}
