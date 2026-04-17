<?php

namespace App\Filament\Resources\CustomsStatuses\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;

class CustomsStatusForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->schema([
                Tabs::make('Tabs')
                    ->columnSpanFull()
                    ->tabs([
                        Tab::make('Details')
                            ->schema([
                                TextInput::make('id')
                                    ->label('Status')
                                    ->required(),
                                Select::make('import_custom_document_id')
                                    ->label('Import Custom Document')
                                    ->required(),
                                Select::make('status')
                                    ->options([
                                        'pending' => 'Pending',
                                        'approved' => 'Approved',
                                        'rejected' => 'Rejected',
                                    ])
                                    ->required(),
                                Textarea::make('description')
                                    ->label('Description'),
                                DateTimePicker::make('response_date')
                                    ->label('Response Date')
                                    ->required(),
                            ]),
                    ]),
            ]);
    }
}
