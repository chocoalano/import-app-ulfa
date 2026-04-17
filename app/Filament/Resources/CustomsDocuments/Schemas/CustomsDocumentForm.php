<?php

namespace App\Filament\Resources\CustomsDocuments\Schemas;

use Filament\Forms\Components\DatePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class CustomsDocumentForm
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
                                    ->label('Import Id')
                                    ->required()
                                    ->columns([
                                        'sm' => 3,
                                        'xl' => 6,
                                        '2xl' => 8,
                                    ]),
                                DatePicker::make('aju_number')
                                    ->label('Aju Number')
                                    ->required(),
                                Select::make('document_type')
                                    ->label('Document Type')
                                    ->options([
                                        'import' => 'Import',
                                        'export' => 'Export',
                                    ])
                                    ->required(),
                                TextInput::make('document_number')
                                    ->label('Document Number')
                                    ->required(),
                                DatePicker::make('response_date')
                                    ->label('Response Date')
                                    ->required(),
                                TextInput::make('customs_channel')
                                    ->label('Customs Channel')
                                    ->required(),
                            ])->columns(3),

                        Tab::make('Status')
                            ->schema([
                                TextInput::make('status_id')
                                    ->label('Status Id')
                                    ->required(),
                                TextInput::make('status')
                                    ->label('Status')
                                    ->required(),
                            ])->columns(3),
                    ])
                // ->vertical()
            ]);
    }
}
