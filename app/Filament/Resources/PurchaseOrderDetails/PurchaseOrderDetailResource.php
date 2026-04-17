<?php

namespace App\Filament\Resources\PurchaseOrderDetails;

use App\Filament\Resources\PurchaseOrderDetails\Pages\CreatePurchaseOrderDetail;
use App\Filament\Resources\PurchaseOrderDetails\Pages\EditPurchaseOrderDetail;
use App\Filament\Resources\PurchaseOrderDetails\Pages\ListPurchaseOrderDetails;
use App\Filament\Resources\PurchaseOrderDetails\Pages\ViewPurchaseOrderDetail;
use App\Filament\Resources\PurchaseOrderDetails\Schemas\PurchaseOrderDetailForm;
use App\Filament\Resources\PurchaseOrderDetails\Schemas\PurchaseOrderDetailInfolist;
use App\Filament\Resources\PurchaseOrderDetails\Tables\PurchaseOrderDetailsTable;
use App\Models\PurchaseOrderDetail;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;

class PurchaseOrderDetailResource extends Resource
{
    // protected static ?string $model = PurchaseOrderDetail::class;

    // protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedRectangleStack;

    // protected static ?string $recordTitleAttribute = 'po_number';

    // public static function form(Schema $schema): Schema
    // {
    //     return PurchaseOrderDetailForm::configure($schema);
    // }

    // public static function infolist(Schema $schema): Schema
    // {
    //     return PurchaseOrderDetailInfolist::configure($schema);
    // }

    // public static function table(Table $table): Table
    // {
    //     return PurchaseOrderDetailsTable::configure($table);
    // }

    // public static function getRelations(): array
    // {
    //     return [
    //         //
    //     ];
    // }

    // public static function getPages(): array
    // {
    //     return [
    //         'index' => ListPurchaseOrderDetails::route('/'),
    //         'create' => CreatePurchaseOrderDetail::route('/create'),
    //         'view' => ViewPurchaseOrderDetail::route('/{record}'),
    //         'edit' => EditPurchaseOrderDetail::route('/{record}/edit'),
    //     ];
    // }
}
