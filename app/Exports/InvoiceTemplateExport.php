<?php

namespace App\Exports;

use Illuminate\Contracts\Queue\ShouldQueue;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\Exportable;
use Maatwebsite\Excel\Concerns\WithHeadings;

class InvoiceTemplateExport implements FromCollection, WithHeadings, ShouldQueue
{
    use Exportable;

    public function headings(): array
    {
        return [
            'Invoice Number',
            'Supplier Name',
            'Invoice Date',
            'Due Date',
            'Total Amount',
            'Status',
            'Notes',
        ];
    }

    public function collection()
    {
        return collect([
            [
                'INV12345',
                'Supplier A',
                '2024-07-01',
                '2024-07-31',
                '1000.00',
                'USD',
                'Pending',
                'First invoice of the month',
            ],
        ]);
    }
}
