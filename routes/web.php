<?php

use App\Exports\InvoiceTemplateExport;
use App\Exports\PurchaseOrderTemplateExport;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\PurchaseOrderController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\TrackingController;
use App\Http\Controllers\UserController;
use App\Models\Shipping;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Maatwebsite\Excel\Facades\Excel;

// Route::get('/', function () {
//     return Inertia::render('welcome', [
//         'canRegister' => Features::enabled(Features::registration()),
//     ]);
// })->name('home');
Route::get('/', function () {
    return Inertia::render('welcome_globe', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/belajar', function () {
    return Inertia::render('belajar');
})->name('belajar');

Route::get('/geo', [App\Http\Controllers\GlobeController::class, 'index'])->name('geo');

Route::get('/tracking', function (Request $request) {
    $shipments = [];

    if ($request->keyword) {
        $keyword = $request->keyword;

        $shipments = Shipping::where(function ($query) use ($keyword) {
            $query->where('bl_number', $keyword)
                ->orWhere('container_number', $keyword)
                ->orWhere('nomor_respon', $keyword);
        })->get();
    }

    return Inertia::render('Tracking', [
        'title' => 'Real-Time Shipment Tracking',
        'subtitle' => 'Enter BL, PO, or Container Number to track your shipment',
        'type' => $request->type,
        'id' => $request->id,
        'shipments' => $shipments,
    ]);
})->name('tracking');


Route::post('/tracking', [TrackingController::class, 'store'])
    ->name('tracking.store');


//show tracking now non login sudah tidak aktif
Route::prefix('track')->group(function () {
    Route::get('/invoice/{invoice}', [InvoiceController::class, 'show'])->name('track.invoice');
    Route::get('/po/{po}', [PurchaseOrderController::class, 'show'])->name('track.po');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    Route::prefix('user')->name('user')->group(function () {
        Route::get('/', [UserController::class, 'index'])->name('index');
        Route::get('/create', [UserController::class, 'create'])->name('create');
        Route::get('/{id}/edit', [UserController::class, 'edit'])->name('edit');
        Route::get('/{id}/view', [UserController::class, 'view'])->name('view');
        Route::get('/{id}/show', [UserController::class, 'show'])->name('show');
    });
});

    Route::prefix('invoice')->name('invoice.')->group(function () {
        Route::get('/', [InvoiceController::class, 'index'])->name('index');
        Route::get('/create', [InvoiceController::class, 'create'])->name('create');
        Route::get('/{invoice}/edit', [InvoiceController::class, 'edit'])->name('edit');
    });

    Route::prefix('po')->name('purchaseOrder.')->group(function () {
        Route::get('/', [PurchaseOrderController::class, 'index'])->name('index');
        Route::get('/create', [PurchaseOrderController::class, 'create'])->name('create');
        Route::post('/', [PurchaseOrderController::class, 'store'])->name('store');
        Route::get('/{id}/edit', [PurchaseOrderController::class, 'edit'])->name('edit');
        Route::put('/{id}', [PurchaseOrderController::class, 'update'])->name('update');
        Route::get('/{id}', [PurchaseOrderController::class, 'show'])->name('show');
    });

    Route::post('/po/import', [PurchaseOrderController::class, 'import'])->name('purchase-orders.import');
    Route::get('/po/export-template', function () {
        return Excel::download(new PurchaseOrderTemplateExport(), 'template-po.xlsx');
    });
    Route::get('/invoice/export-template', function () {
        return Excel::download(new InvoiceTemplateExport(), 'template-invoice.xlsx');
    });

    Route::prefix('supplier')->name('supplier.')->group(function () {
        Route::get('/', [SupplierController::class, 'index'])->name('index');
        Route::get('/create', [SupplierController::class, 'create'])->name('create');
        Route::get('/{id}/edit', [SupplierController::class, 'edit'])->name('edit');
        Route::get('/{id}/view', [SupplierController::class, 'view'])->name('view');
        Route::post('/store', [SupplierController::class, 'store'])->name('supplier.store');
    });
    

require __DIR__ . '/settings.php';
