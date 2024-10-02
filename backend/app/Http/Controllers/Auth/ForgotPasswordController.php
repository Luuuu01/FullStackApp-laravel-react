<?php

namespace App\Http\Controllers\Auth;
// Make sure this line exists in your ForgotPasswordController.php
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    public function showLinkRequestForm()
    {
        // Vraća view za unos email adrese (možeš ga prilagoditi)
        return view('auth.passwords.email');
    }

    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
                    ? response()->json(['message' => 'Reset link sent to your email.'])
                    : response()->json(['message' => trans($status)], 500);
    }
}

