<?php

namespace App\Filament\Resources\VesselStatuses\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class VesselStatusInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('import_id'),

                TextEntry::make('source')
                    ->placeholder('-'),

                TextEntry::make('vessel_name'),

                TextEntry::make('etd')
                    ->dateTime()
                    ->placeholder('-'),

                TextEntry::make('eta')
                    ->dateTime()
                    ->placeholder('-'),

                TextEntry::make('ata')
                    ->dateTime()
                    ->placeholder('-'),

                TextEntry::make('status')
                    ->badge(),

                TextEntry::make('updated_at')
                    ->since(),
            ]);
    }
}
