<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shipping extends Model
{
    use HasFactory;

    /**
     * Mass assignable attributes
     */
    protected $fillable = [
        'id',
        'purchase_order_id',
        'invoice_id',
        'supplier_id',
        'custom_reference',
        'nomor_respon',
        'kode_respon',
        'bl_number',
        'pol',
        'pod',
        'etd',
        'eta',
        'trucking_date',
        'carrier',
        'container_number',
        'status',
        'estimated_arrival',
        'notes',
    ];

    /**
     * Attribute casting
     */
    protected $casts = [
        'estimated_arrival' => 'date',
    ];

    /* =======================
     | Relationships
     ======================= */

    /**
     * Shipping belongs to Purchase Order
     */
    public function purchaseOrder()
    {
        return $this->belongsTo(PurchaseOrder::class);
    }

    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
}
