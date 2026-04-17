<?php

namespace App\Filament\Resources\InternalWorkflows\Pages;

use App\Filament\Resources\InternalWorkflows\InternalWorkflowResource;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewInternalWorkflow extends ViewRecord
{
    protected static string $resource = InternalWorkflowResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
        ];
    }
}
