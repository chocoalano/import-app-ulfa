<?php

namespace App\Filament\Resources\InternalWorkflows;

use App\Filament\Resources\InternalWorkflows\Pages\CreateInternalWorkflow;
use App\Filament\Resources\InternalWorkflows\Pages\EditInternalWorkflow;
use App\Filament\Resources\InternalWorkflows\Pages\ListInternalWorkflows;
use App\Filament\Resources\InternalWorkflows\Pages\ViewInternalWorkflow;
use App\Filament\Resources\InternalWorkflows\Schemas\InternalWorkflowForm;
use App\Filament\Resources\InternalWorkflows\Schemas\InternalWorkflowInfolist;
use App\Filament\Resources\InternalWorkflows\Tables\InternalWorkflowsTable;
use App\Models\InternalWorkflow;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use UnitEnum;

class InternalWorkflowResource extends Resource
{
    protected static ?string $model = InternalWorkflow::class;

    protected static string|BackedEnum|null $navigationIcon = Heroicon::ArrowsRightLeft;

    protected static string | UnitEnum | null $navigationGroup = 'Operational';
    
    public static function form(Schema $schema): Schema
    {
        return InternalWorkflowForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return InternalWorkflowInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return InternalWorkflowsTable::configure($table);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListInternalWorkflows::route('/'),
            'create' => CreateInternalWorkflow::route('/create'),
            'view' => ViewInternalWorkflow::route('/{record}'),
            'edit' => EditInternalWorkflow::route('/{record}/edit'),
        ];
    }
}
