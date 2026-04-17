<?php

namespace App\Filament\Resources\InternalWorkflows\Pages;

use App\Filament\Resources\InternalWorkflows\InternalWorkflowResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;

class EditInternalWorkflow extends EditRecord
{
    protected static string $resource = InternalWorkflowResource::class;

    protected function getHeaderActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }
}
