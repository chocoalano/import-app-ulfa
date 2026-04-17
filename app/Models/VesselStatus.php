<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class VesselStatus extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'invoice_id',
        'bl_number',
        'source',
        'vessel_name',
        'voyage_number',
        'etd',
        'eta',
        'ata',
        'status',
        'updated_at',
    ];
}
