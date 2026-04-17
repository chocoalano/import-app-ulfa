<?php

namespace App\Filament\Resources\VesselStatuses\Pages;

use App\Filament\Resources\VesselStatuses\VesselStatusResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewVesselStatus extends ViewRecord
{
    protected static string $resource = VesselStatusResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
