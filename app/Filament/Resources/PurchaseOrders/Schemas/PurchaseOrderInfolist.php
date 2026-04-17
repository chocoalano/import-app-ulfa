<?php

namespace App\Filament\Resources\PurchaseOrders\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class PurchaseOrderInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('supplier_id')
                    ->numeric(),
                TextEntry::make('po_number'),
                TextEntry::make('status'),
                TextEntry::make('total_qty')
                    ->numeric(),
                TextEntry::make('order_date')
                    ->date()
                    ->placeholder('-'),
                TextEntry::make('incoterm')
                    ->placeholder('-'),
                TextEntry::make('expected_delivery_date')
                    ->date()
                    ->placeholder('-'),
                TextEntry::make('expected_arrival_date')
                    ->date()
                    ->placeholder('-'),
                TextEntry::make('notes')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
