<?php

namespace App\Filament\Resources\PurchaseOrders\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Schema;

class PurchaseOrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([

                Select::make('supplier_id')
                    ->relationship('supplier', 'name')
                    ->searchable()
                    ->required(),

                TextInput::make('po_number')
                    ->required()
                    ->unique(ignoreRecord: true),

                Select::make('status')
                    ->options([
                        'draft' => 'Draft',
                        'approved' => 'Approved',
                        'shipped' => 'Shipped',
                        'completed' => 'Completed',
                        'cancelled' => 'Cancelled',
                    ])
                    ->default('draft')
                    ->required(),

                TextInput::make('total_qty')
                    ->numeric()
                    ->default(0)
                    ->disabled()
                    ->dehydrated(false),

                DatePicker::make('order_date'),

                TextInput::make('incoterm'),

                DatePicker::make('expected_delivery_date'),

                DatePicker::make('expected_arrival_date'),

                Textarea::make('notes')
                    ->columnSpanFull(),
            ])
            ->columns(3);
    }
}
