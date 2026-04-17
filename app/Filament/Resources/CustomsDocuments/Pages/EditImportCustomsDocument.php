<?php

namespace App\Filament\Resources\CustomsDocuments\Pages;

use App\Filament\Resources\CustomsDocuments\CustomsDocumentResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditImportCustomsDocument extends EditRecord
{
    protected static string $resource = CustomsDocumentResource::class;

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
