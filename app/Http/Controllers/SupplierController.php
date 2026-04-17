<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class SupplierController extends Controller
{
    public function index()
    {
        return Inertia::render('supplier/index', [
            'title' => 'Supplier List',
            'suppliers' => Supplier::latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('supplier/create', [
            'title' => 'Create Supplier',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'Name'    => ['required', 'string', 'max:255'],
            'VendAccount'    => ['required', 'string', 'max:50', 'unique:suppliers,code'],
            'MarkupGroup'   => ['nullable', 'string', 'max:255'],
            'ItemBuyerGroupId'   => ['nullable', 'string', 'max:30'],
            'phone'   => ['nullable', 'string', 'max:30'],
            'address' => ['nullable', 'string'],
        ]);

        Supplier::create($validated);

        return Redirect::route('supplier.index')
            ->with('success', 'Supplier berhasil ditambahkan');
    }

    public function show(string $id)
    {
        return Inertia::render('supplier/view', [
            'supplier' => Supplier::findOrFail($id),
        ]);
    }

    public function edit(string $id)
    {
        return Inertia::render('supplier/edit', [
            'supplier' => Supplier::findOrFail($id),
        ]);
    }
}
