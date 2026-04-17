<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceDetail extends Model
{
    use HasFactory;

    protected $table = 'invoice_details';

    /**
     * Mass assignable attributes.
     */
    protected $fillable = [
        'invoice_id',
        'purchase_order_id',
        'purchase_order_detail_id',
        'itemId',
        'Name',
        'description',
        'qty',
        'PurchUnit',
        'hs_code',
    ];

    /**
     * Cast attributes.
     */
    protected $casts = [
        'qty' => 'decimal:2',
    ];

    /**
     * Relasi ke Invoice
     */
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }
    public function purchaseOrderDetail()
    {
        return $this->belongsTo(PurchaseOrderDetail::class);
    }
    public function purchseOrder()
    {
        return $this->belongsTo(PurchaseOrder::class);
    }
}
