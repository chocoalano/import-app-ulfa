<?php

namespace App\Filament\Resources\VesselStatuses\Schemas;

use Filament\Schemas\Schema;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\DateTimePicker;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;

class VesselStatusForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Tabs::make('Vessel Status')
                    ->columnSpanFull()
                    ->tabs([
                        Tab::make('General')
                            ->schema([
                                TextInput::make('import_id')->required(),
                                TextInput::make('source')->required(),
                                TextInput::make('vessel_name')->required(),
                                DateTimePicker::make('etd')->required(),
                                DateTimePicker::make('eta')->required(),
                                DateTimePicker::make('ata')->required(),
                                TextInput::make('status')->required(),
                            ])
                            ->columns(2),
                    ]),
            ]);
    }
}
