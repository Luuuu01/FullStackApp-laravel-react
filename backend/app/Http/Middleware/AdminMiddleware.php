<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        // Check if the authenticated user is an admin
        if (Auth::check() && Auth::user()->is_admin) {
            return $next($request);
        }

        // If not an admin, return a 403 Forbidden response
        return response()->json(['message' => 'Forbidden'], 403);
    }
}
