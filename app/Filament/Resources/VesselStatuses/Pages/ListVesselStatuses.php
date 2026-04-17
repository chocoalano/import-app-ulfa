<?php

namespace App\Filament\Resources\VesselStatuses\Pages;

use App\Filament\Resources\VesselStatuses\VesselStatusResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListVesselStatuses extends ListRecords
{
    protected static string $resource = VesselStatusResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
