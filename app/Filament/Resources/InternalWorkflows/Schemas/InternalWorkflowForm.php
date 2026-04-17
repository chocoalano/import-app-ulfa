<?php

namespace App\Filament\Resources\InternalWorkflows\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class InternalWorkflowForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Tabs')
                    ->columnSpanFull()
                    ->tabs([
                        Tab::make('General')
                            ->schema([
                                TextInput::make('import_id')
                                    ->required()
                                    ->numeric(),
                                DatePicker::make('payment_done_date'),
                                DatePicker::make('document_received_date'),
                                DatePicker::make('container_release_date'),
                                DatePicker::make('warehouse_arrival_date'),
                                Textarea::make('note')
                                    ->columnSpanFull(),
                            ])->columns(3),
                    ]),
            ]);
    }
}
