<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InternalWorkflow extends Model
{
    protected $fillable = [
        'invoice_id',
        'document_type',
        'payment_done_date',
        'document_received_date', // date when the document was received
        'container_release_date',
        'warehouse_arrival_date',
        'note',
        'created_at',
        'updated_at',
    ];
}
