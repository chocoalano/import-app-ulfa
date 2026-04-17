<?php

namespace App\Filament\Resources\PurchaseOrderDetails\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class PurchaseOrderDetailForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('purchase_order_id')
                    ->required()
                    ->numeric(),
                TextInput::make('ItemId'),
                TextInput::make('Name')
                    ->required(),
                Textarea::make('description')
                    ->columnSpanFull(),
                TextInput::make('PurchQty')
                    ->required()
                    ->numeric(),
                TextInput::make('PurchUnit')
                    ->required()
                    ->default('pcs'),
                TextInput::make('hs_code'),
            ]);
    }
}
