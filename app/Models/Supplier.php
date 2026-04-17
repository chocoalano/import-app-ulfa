<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Supplier extends Model
{
    use HasFactory;

    /**
     * Mass assignable attributes
     */
    protected $fillable = [
        'Name',
        'VendAccount',
        'MarkupGroup', //country
        'ItemBuyerGroupId', //import atau lokal
        'phone',
        'address',
    ];

    /* ======================
     | Relationships
     ====================== */

    /**
     * Supplier has many Purchase Orders
     */
    public function purchaseOrders()
    {
        return $this->hasMany(PurchaseOrder::class);
    }

    /**
     * Supplier has many Invoices
     */
    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }
}
