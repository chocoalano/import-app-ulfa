<?php

namespace App\Filament\Resources\Invoices\RelationManagers;

use App\Models\PurchaseOrderDetail;
use Filament\Actions\CreateAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class DetailsRelationManager extends RelationManager
{
    protected static string $relationship = 'details'; 
    // pastikan ini sesuai relasi di model Invoice

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Select::make('purchase_order_detail_id')
                    ->label('ItemId')
                    ->options(
                        PurchaseOrderDetail::query()
                            ->pluck('Name', 'id')
                    )
                    ->searchable()
                    ->required(),

                TextInput::make('PurchQty')
                    ->numeric()
                    ->required(),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('purchaseOrderDetail.ItemId')
                    ->label('Item Number'),

                TextColumn::make('purchaseOrderDetail.Name')
                    ->label('Item Name'),

                TextColumn::make('PurchQty')
                    ->label('Quantity'),
            ])
            ->headerActions([
                CreateAction::make(),
            ]);
    }
}