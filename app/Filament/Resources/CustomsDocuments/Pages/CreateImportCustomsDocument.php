<?php

namespace App\Filament\Resources\CustomsDocuments\Pages;

use App\Filament\Resources\CustomsDocuments\CustomsDocumentResource;
use Filament\Resources\Pages\CreateRecord;

class CreateImportCustomsDocument extends CreateRecord
{
    protected static string $resource = CustomsDocumentResource::class;

    protected static ?string $tiitle = 'Create Customs Document';
}
