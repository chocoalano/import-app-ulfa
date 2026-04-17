<?php

namespace App\Filament\Resources\InvoiceDetails\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class InvoiceDetailForm
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
                                TextInput::make('invoice_id')
                                    ->numeric(),
                                TextInput::make('ItemId'),
                                TextInput::make('Name')
                                    ->required(),
                                    TextInput::make('quantity')
                                    ->required()
                                    ->numeric(),
                                    TextInput::make('PurchUnit')
                                    ->required()
                                    ->default('pcs'),
                                    TextInput::make('hs_code'),
                                    Textarea::make('description')
                                        ->columnSpanFull(),
                            ])->columns(3),
                    ]),
            ]);
    }
}
