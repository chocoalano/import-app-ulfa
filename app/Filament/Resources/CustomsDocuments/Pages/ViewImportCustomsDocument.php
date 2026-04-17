<?php

namespace App\Filament\Resources\CustomsDocuments\Pages;

use App\Filament\Resources\CustomsDocuments\CustomsDocumentResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewImportCustomsDocument extends ViewRecord
{
    protected static string $resource = CustomsDocumentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
