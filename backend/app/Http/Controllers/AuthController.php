<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'User registered successfully']);
    }

    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    // Attempt to authenticate the user
    if (!Auth::attempt($request->only('email', 'password'))) {
        return response()->json(['success' => false, 'message' => 'Invalid credentials.'], 401);
    }

    // Retrieve the authenticated user
    $user = User::where('email', $request->email)->firstOrFail();
    $token = $user->createToken('auth_token')->plainTextToken;

    // Get the is_admin status from the user
    $is_admin = $user->is_admin;

    return response()->json([
        'success' => true,
        'token' => $token,
        'token_type' => 'Bearer',
        'is_admin' => $is_admin,
    ]);
}


    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'User logged out']);
    }

    public function forgotPassword(Request $request)
{
    $request->validate(['email' => 'required|email']);

    // Proveri da li korisnik sa datim emailom postoji
    $user = User::where('email', $request->email)->first();
    if (!$user) {
        return response()->json(['message' => 'Email address not found.'], 404);
    }

    // Pošalji reset link
    try {
        $status = Password::sendResetLink(
            $request->only('email')
        );

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Reset link sent to your email.']);
        } else {
            \Log::error('Password reset link error: ' . trans($status));
            return response()->json(['message' => 'Error sending reset link.'], 500);
        }
    } catch (\Exception $e) {
        \Log::error('Error sending reset link: ' . $e->getMessage());
        return response()->json(['message' => 'Error sending reset link.'], 500);
    }
}






    public function testEmail()
    {
        try {
            Mail::raw('This is a test email', function ($message) {
                $message->to('ilic.andrijaa@gmail.com') // promeni na svoj email
                        ->subject('Test Email');
            });

            return response()->json(['message' => 'Email sent!']);
        } catch (\Exception $e) {
            Log::error('Error sending test email: ' . $e->getMessage());
            return response()->json(['message' => 'Error sending email.'], 500);
        }
    }

    public function adminLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json(['success' => false], 401);
        }

        $user = User::where('email', $request->email)->firstOrFail();
        
        if ($user->is_admin) { // Provera da li je admin
            $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json(['success' => true, 'token' => $token]);
        }

        return response()->json(['success' => false, 'message' => 'Unauthorized'], 403);
    }




}
