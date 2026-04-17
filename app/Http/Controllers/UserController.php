<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\View\View;

class UserController extends Controller
{
    public function show(int $id): View
    {
        $user = User::findOrFail($id);

        return view('user.profile', compact('user'));
    }
}
