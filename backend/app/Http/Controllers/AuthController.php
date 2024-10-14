<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

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
        $user = Auth::user(); // Use Auth::user() to get the currently authenticated user
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
        // Ensure the user is authenticated before attempting to log out
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'User logged out']);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        // Check if the user with the given email exists
        $user = User::where('email', $request->email)->first();
        if (!$user) {
            return response()->json(['message' => 'Email address not found.'], 404);
        }

        // Send reset link
        try {
            $status = Password::sendResetLink($request->only('email'));

            if ($status === Password::RESET_LINK_SENT) {
                return response()->json(['message' => 'Reset link sent to your email.']);
            } else {
                Log::error('Password reset link error: ' . trans($status));
                return response()->json(['message' => 'Error sending reset link.'], 500);
            }
        } catch (\Exception $e) {
            Log::error('Error sending reset link: ' . $e->getMessage());
            return response()->json(['message' => 'Error sending reset link.'], 500);
        }
    }

    public function getUser(Request $request)
    {
        return response()->json([
            'id' => $request->user()->id,
            'name' => $request->user()->name,
            'email' => $request->user()->email,
            'is_admin' => $request->user()->is_admin, // Include is_admin status
        ]);
    }

    
}