<?php

namespace App\Filament\Resources\PurchaseOrderDetails\Pages;

use App\Filament\Resources\PurchaseOrderDetails\PurchaseOrderDetailResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewPurchaseOrderDetail extends ViewRecord
{
    protected static string $resource = PurchaseOrderDetailResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
