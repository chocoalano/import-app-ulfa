<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Invoice extends Model
{
    use HasFactory;

    /**
     * Mass assignable attributes
     */
    protected $fillable = [
        'VendAccount',
        'PurchId',
        'invoice_number',
        'inventTransRefId',
        'status',
        'total_qty',
        'incoterm',
        'DeliveryDate',
        'expected_arrival_date',
        'notes',
    ];

    /**
     * Attribute casting
     */
    protected $casts = [
        'total' => 'decimal:2',
    ];

    /* =======================
     | Relationships
     ======================= */

    /**
     * Invoice belongs to Supplier
     */
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    /**
     * Invoice belongs to Purchase Order
     */
    public function purchaseOrders()
    {
        return $this->belongsToMany(PurchaseOrder::class, 'invoice_purchase_order');
    }

    /**
     * Invoice has many details
     */
    public function details()
    {
        return $this->hasMany(InvoiceDetail::class);
    }

    /* =======================
     | Helpers / Scopes
     ======================= */

    /**
     * Recalculate invoice total from details
     */
    public function recalculateTotal(): void
    {
        $this->total_qty = $this->details()->sum('quantity');
        $this->save();
    }
}
