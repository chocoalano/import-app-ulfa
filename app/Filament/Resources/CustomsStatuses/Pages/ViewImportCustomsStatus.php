<?php

namespace App\Filament\Resources\CustomsStatuses\Pages;

use App\Filament\Resources\CustomsStatuses\CustomsStatusResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewImportCustomsStatus extends ViewRecord
{
    protected static string $resource = CustomsStatusResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
