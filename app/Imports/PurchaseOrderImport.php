<?php

namespace App\Imports;

use App\Models\PurchaseOrder;
use App\Models\PurchaseOrderDetail;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class PurchaseOrderImport implements
    ToCollection,
    WithHeadingRow,
    WithValidation,
    WithChunkReading
{
    public function collection(Collection $rows)
    {
        DB::transaction(function () use ($rows) {
            foreach ($rows as $row) {
                try {
                    // 1️⃣ HEADER PO
                    $purchaseOrder = PurchaseOrder::firstOrCreate(
                        ['po_number' => $row['po_number']],
                        [
                            'supplier_name'          => $row['supplier_name'],
                            'status'                 => strtolower($row['status']),
                            'total'                  => 0,
                            'incoterm'               => $row['incoterm'],
                            'expected_delivery_date' => $row['expected_delivery_date'],
                            'expected_arrival_date'  => $row['expected_arrival_date'],
                            'notes'                  => $row['notes'],
                        ]
                    );

                    // 2️⃣ DETAIL PO
                    PurchaseOrderDetail::create([
                        'purchase_order_id' => $purchaseOrder->id,
                        'ItemId'       => $row['ItemId'],
                        'Name'         => $row['Name'],
                        'PurchQty'          => (int) $row['quantity'],
                        'PurchUnit'              => $row['unit'],
                        'hs_code'           => $row['hs_code'],
                    ]);

                    // 3️⃣ UPDATE TOTAL
                    $purchaseOrder->increment('total', (int) $row['quantity']);

                } catch (\Exception $e) {
                    Log::error('PO Import Failed', [
                        'error' => $e->getMessage(),
                        'row'   => $row,
                    ]);
                }
            }
        });
    }

    /**
     * VALIDASI EXCEL
     */
    public function rules(): array
    {
        return [
            '*.po_number'     => 'required|string',
            '*.supplier_name' => 'required|string',
            '*.ItemId'   => 'required|string',
            '*.Name'     => 'required|string',
            '*.quantity'      => 'required|numeric|min:1',
        ];
    }

    /**
     * CHUNK UNTUK FILE BESAR
     */
    public function chunkSize(): int
    {
        return 500;
    }
}
