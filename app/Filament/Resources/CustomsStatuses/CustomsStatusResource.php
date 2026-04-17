<?php

namespace App\Filament\Resources\CustomsStatuses;

use App\Filament\Resources\CustomsStatuses\Pages\CreateImportCustomsStatus;
use App\Filament\Resources\CustomsStatuses\Pages\EditImportCustomsStatus;
use App\Filament\Resources\CustomsStatuses\Pages\ListImportCustomsStatuses;
use App\Filament\Resources\CustomsStatuses\Pages\ViewImportCustomsStatus;
use App\Filament\Resources\CustomsStatuses\Schemas\CustomsStatusForm;
use App\Filament\Resources\CustomsStatuses\Schemas\CustomsStatusInfolist;
use App\Filament\Resources\CustomsStatuses\Tables\CustomsStatusesTable;
use App\Models\ImportCustomsStatus;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use UnitEnum;

class CustomsStatusResource extends Resource
{
    protected static ?string $model = ImportCustomsStatus::class;

    protected static ?string $navigationLabel = 'Import Status';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedGlobeAsiaAustralia;

    protected static string | UnitEnum | null $navigationGroup = 'Operational';

    // protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return CustomsStatusForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return CustomsStatusInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CustomsStatusesTable::configure($table);
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
            'index' => ListImportCustomsStatuses::route('/'),
            'create' => CreateImportCustomsStatus::route('/create'),
            'view' => ViewImportCustomsStatus::route('/{record}'),
            'edit' => EditImportCustomsStatus::route('/{record}/edit'),
        ];
    }

    public static function getRecordRouteBindingEloquentQuery(): Builder
    {
        return parent::getRecordRouteBindingEloquentQuery()
            ->withoutGlobalScopes([
                SoftDeletingScope::class,
            ]);
    }
}
