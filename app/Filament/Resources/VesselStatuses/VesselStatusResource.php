<?php

namespace App\Filament\Resources\VesselStatuses;

use App\Filament\Resources\VesselStatuses\Pages\CreateVesselStatus;
use App\Filament\Resources\VesselStatuses\Pages\EditVesselStatus;
use App\Filament\Resources\VesselStatuses\Pages\ListVesselStatuses;
use App\Filament\Resources\VesselStatuses\Pages\ViewVesselStatus;
use App\Filament\Resources\VesselStatuses\Schemas\VesselStatusForm;
use App\Filament\Resources\VesselStatuses\Schemas\VesselStatusInfolist;
use App\Filament\Resources\VesselStatuses\Tables\VesselStatusesTable;
use App\Models\VesselStatus;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use UnitEnum;

class VesselStatusResource extends Resource
{
    protected static ?string $model = VesselStatus::class;

    // show vessel name on record titles
    protected static ?string $recordTitleAttribute = 'vessel_name';

    protected static string|BackedEnum|null $navigationIcon = 'ri-ship-line';

    protected static string | UnitEnum | null $navigationGroup = 'Operational';

    public static function form(Schema $schema): Schema
    {
        return VesselStatusForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return VesselStatusInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return VesselStatusesTable::configure($table);
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
            'index' => ListVesselStatuses::route('/'),
            'create' => CreateVesselStatus::route('/create'),
            'view' => ViewVesselStatus::route('/{record}'),
            'edit' => EditVesselStatus::route('/{record}/edit'),
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
