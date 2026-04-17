<?php

namespace App\Filament\Resources\CustomsDocuments\Pages;

use App\Filament\Resources\CustomsDocuments\CustomsDocumentResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListImportCustomsDocuments extends ListRecords
{
    protected static string $resource = CustomsDocumentResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
