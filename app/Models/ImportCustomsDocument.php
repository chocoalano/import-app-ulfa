<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ImportCustomsDocument extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'invoice_id',
        'aju_number',
        'document_type', //PIB, SPPB, BC23, BC25, BC27, BC28
        'document_number',
        'status',
        'response_date',
        'customs_channel',
        'status_id',
        'raw_response_json',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'response_date' => 'datetime',
        'raw_response_json' => 'array',
    ];

    public function status()
    {
        return $this->belongsTo(ImportCustomsStatus::class, 'status_id');
    }
}
