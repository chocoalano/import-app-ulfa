<?php

namespace App\Filament\Resources\InternalWorkflows\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class InternalWorkflowInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('import_id')
                    ->numeric(),
                TextEntry::make('payment_done_date')
                    ->date()
                    ->placeholder('-'),
                TextEntry::make('document_received_date')
                    ->date()
                    ->placeholder('-'),
                TextEntry::make('container_release_date')
                    ->date()
                    ->placeholder('-'),
                TextEntry::make('warehouse_arrival_date')
                    ->date()
                    ->placeholder('-'),
                TextEntry::make('note')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('created_at')
                    ->dateTime(),
                TextEntry::make('updated_at')
                    ->dateTime(),
            ]);
    }
}
