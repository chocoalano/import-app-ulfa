<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PurchaseOrderDetail extends Model
{
    use HasFactory;

    protected $table = 'purchase_order_details';

    /**
     * Mass assignable attributes.
     */
    protected $fillable = [
        'purchase_order_id',
        'PurchId',
        'ItemId',
        'Name',
        'PurchQty',
        'PurchUnit',
        'hs_code', //nullable
    ];

    /**
     * Cast attributes.
     */
    protected $casts = [
        'quantity' => 'decimal:2',
    ];

    /**
     * Relasi ke PurchaseOrder
     */
    public function purchaseOrder()
    {
        return $this->belongsTo(PurchaseOrder::class);
    }

    /**
     * Invoice details that reference this PO item.
     */
    public function invoiceDetails()
    {
        return $this->hasMany(\App\Models\InvoiceDetail::class, 'purchase_order_detail_id');
    }

    /**
     * Total quantity already invoiced from this line.
     */
    public function invoicedQuantity(): float
    {
        return $this->invoiceDetails()->sum('quantity');
    }

    /**
     * Remaining quantity that can still be invoiced.
     */
    public function getRemainingQuantityAttribute(): float
    {
        return (float) $this->quantity - $this->invoicedQuantity();
    }

    /**
     * Scope for filtering only items with remaining quantity > 0.
     */
    public function scopeWithRemaining($query)
    {
        return $query->whereRaw('quantity > COALESCE((select sum(quantity) from invoice_details where purchase_order_detail_id = purchase_order_details.id),0)');
    }


    /**
     * Status helpers (opsional tapi berguna)
     */
    public const STATUS_PENDING   = 'pending';
    public const STATUS_SHIPPED   = 'shipped';
    public const STATUS_RECEIVED  = 'received';
    public const STATUS_CANCELLED = 'cancelled';
}
