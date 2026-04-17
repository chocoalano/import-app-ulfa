<?php

namespace App\Filament\Resources\CustomsStatuses\Pages;

use App\Filament\Resources\CustomsStatuses\CustomsStatusResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditImportCustomsStatus extends EditRecord
{
    protected static string $resource = CustomsStatusResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}
