<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\Exportable;

class PurchaseOrderTemplateExport implements FromCollection, WithHeadings
{
    use Exportable;

    public function headings(): array
    {
        return [
            'PO Number',
            'Supplier Name',
            'Status',
            'Total',
            'Incoterm',
            'Expected Delivery Date',
            'Expected Arrival Date',
            'Notes',
            'Item Number',
            'Item Name',
            'Description',
            'Quantity',
            'Unit',
            'HS Code',
        ];
    }
    public function collection()
    {
        return collect([
            [
                'PO12345',
                'Supplier A',
                'Pending',
                '0',
                'FOB',
                'USD',
                '2024-07-01',
                '2024-07-10',
                'Urgent order',
                'ITEM001',
                'Item Name 1',
                'Item Description 1',
                '100',
                'pcs',
                'HS1234',
            ],
        ]);
    }
}
