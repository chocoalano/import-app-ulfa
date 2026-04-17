<?php

namespace App\Filament\Resources\PurchaseOrderDetails\Pages;

use App\Filament\Resources\PurchaseOrderDetails\PurchaseOrderDetailResource;
use Filament\Resources\Pages\CreateRecord;

class CreatePurchaseOrderDetail extends CreateRecord
{
    protected static string $resource = PurchaseOrderDetailResource::class;
}
