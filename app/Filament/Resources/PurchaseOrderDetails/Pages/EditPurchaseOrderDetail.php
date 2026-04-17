<?php

namespace App\Filament\Resources\PurchaseOrderDetails\Pages;

use App\Filament\Resources\PurchaseOrderDetails\PurchaseOrderDetailResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditPurchaseOrderDetail extends EditRecord
{
    protected static string $resource = PurchaseOrderDetailResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
