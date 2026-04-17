<?php

namespace App\Filament\Resources\PurchaseOrderDetails\Pages;

use App\Filament\Resources\PurchaseOrderDetails\PurchaseOrderDetailResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListPurchaseOrderDetails extends ListRecords
{
    protected static string $resource = PurchaseOrderDetailResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
