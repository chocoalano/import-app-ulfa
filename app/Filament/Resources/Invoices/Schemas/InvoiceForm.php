<?php

namespace App\Filament\Resources\Invoices\Schemas;

use Filament\Forms\Components\CheckboxList;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class InvoiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Tabs')
                    ->columnSpanFull()
                    ->tabs([
                        Tab::make('General')
                            ->schema([
                                Select::make('supplier_id')
                                    ->relationship('supplier', 'name')
                                    ->required(),

                                CheckboxList::make('purchaseOrders')
                                    ->label('Purchase Orders')
                                    ->relationship('purchaseOrders', 'po_number')
                                    ->reactive(),

                                TextInput::make('invoice_number')
                                    ->required(),

                                TextInput::make('status')
                                    ->default('draft')
                                    ->required(),

                                TextInput::make('total_qty')
                                    ->numeric()
                                    ->default(0)
                                    ->disabled(),

                                Textarea::make('notes')
                                    ->columnSpanFull(),
                            ])
                            ->columns(2),
                    ]),
            ]);
    }
}
