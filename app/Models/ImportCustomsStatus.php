<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ImportCustomsStatus extends Model
{
    use SoftDeletes;
    
    protected $fillable = [
        'id',
        'import_custom_document_id',
        'status',
        'description',
        'response_date',
        'created_by',
        'updated_by',
    ];

    protected $casts = [
        'response_date' => 'datetime',
    ];

    public function customsDocument()
    {
        return $this->hasMany(ImportCustomsDocument::class, 'status_id');
    }

}
