<?php

namespace App\Filament\Resources\CustomsStatuses\Pages;

use App\Filament\Resources\CustomsStatuses\CustomsStatusResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListImportCustomsStatuses extends ListRecords
{
    protected static string $resource = CustomsStatusResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
