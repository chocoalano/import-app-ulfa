<?php

namespace App\Filament\Resources\PurchaseOrderDetails\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class PurchaseOrderDetailInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('purchase_order_id')
                    ->numeric(),
                TextEntry::make('ItemId')
                    ->placeholder('-'),
                TextEntry::make('Name'),
                TextEntry::make('description')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('PurchQty')
                    ->numeric(),
                TextEntry::make('PurchUnit'),
                TextEntry::make('hs_code')
                    ->placeholder('-'),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
            ]);
    }
}
