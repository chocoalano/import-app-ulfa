<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Supplier;
use App\Models\PurchaseOrderDetail;
use Illuminate\Database\Eloquent\SoftDeletes;

class PurchaseOrder extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'VendAccount',
        'PurchId',
        'status', //nullable
        'total_qty', //nullable
        'incoterm', //nullable
        'DeliveryDate',
        'expected_arrival_date',
        'createdDateTime',
        'notes',
    ];

    protected $casts = [
        'total_qty' => 'decimal:2',
        'createdDateTime' => 'date',
        'DeliveryDate' => 'date',
        'expected_arrival_date' => 'date',
    ];

    /* ======================
     | Relationships
     ====================== */

    /**
     * Purchase Order belongs to Supplier
     */
    public function supplier()
    {
        return $this->belongsTo(Supplier::class, 'VendAccount');
    }

    /**
     * Purchase Order has many details
     */
    public function purchaseOrderDetails()
    {
        return $this->hasMany(PurchaseOrderDetail::class);
    }

    /**
     * Purchase Order belongs to many Invoices
     */
    public function invoices()
    {
        return $this->belongsToMany(Invoice::class, 'invoice_purchase_order');
    }

    public function items()
    {
        return $this->hasMany(PurchaseOrderDetail::class, 'purchase_order_id');
    }

    /* ======================
     | Helpers
     ====================== */

    /**
     * Recalculate PO total from details
     */
    public function recalculateTotal(): void
    {
        $this->total = $this->details()->sum(
            fn($item) => $item->quantity * $item->unit_price
        );

        $this->save();
    }
}
