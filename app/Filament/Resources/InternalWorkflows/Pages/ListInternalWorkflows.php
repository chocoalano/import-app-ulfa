<?php

namespace App\Filament\Resources\InternalWorkflows\Pages;

use App\Filament\Resources\InternalWorkflows\InternalWorkflowResource;
use Filament\Actions\CreateAction;
use Filament\Resources\Pages\ListRecords;

class ListInternalWorkflows extends ListRecords
{
    protected static string $resource = InternalWorkflowResource::class;

    protected function getHeaderActions(): array
    {
        return [
            CreateAction::make(),
        ];
    }
}
