<?php

namespace App\Filament\Resources\CustomsDocuments;

use App\Filament\Resources\CustomsDocuments\Pages\CreateImportCustomsDocument;
use App\Filament\Resources\CustomsDocuments\Pages\EditImportCustomsDocument;
use App\Filament\Resources\CustomsDocuments\Pages\ListImportCustomsDocuments;
use App\Filament\Resources\CustomsDocuments\Pages\ViewImportCustomsDocument;
use App\Filament\Resources\CustomsDocuments\Schemas\CustomsDocumentForm;
use App\Filament\Resources\CustomsDocuments\Schemas\CustomsDocumentInfolist;
use App\Filament\Resources\CustomsDocuments\Tables\CustomsDocumentsTable;
use App\Models\ImportCustomsDocument;
use BackedEnum;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use UnitEnum;

class CustomsDocumentResource extends Resource
{
    protected static ?string $model = ImportCustomsDocument::class;

    protected static ?string $label = 'Import Documents';

    protected static string|BackedEnum|null $navigationIcon = Heroicon::OutlinedClipboardDocumentCheck;

    protected static string | UnitEnum | null $navigationGroup = 'Operational';

    protected static ?string $recordTitleAttribute = 'aju_number';

    public static function form(Schema $schema): Schema
    {
        return CustomsDocumentForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return CustomsDocumentInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return CustomsDocumentsTable::configure($table);
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
            'index' => ListImportCustomsDocuments::route('/'),
            'create' => CreateImportCustomsDocument::route('/create'),
            'view' => ViewImportCustomsDocument::route('/{record}'),
            'edit' => EditImportCustomsDocument::route('/{record}/edit'),
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
