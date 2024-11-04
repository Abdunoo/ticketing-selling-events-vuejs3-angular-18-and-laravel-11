<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if the user is authenticated using Sanctum or any guard
        if (Auth::guard('sanctum')->check()) {
            $user = Auth::guard('sanctum')->user();

            // Merge the authenticated user into the request
            $request->merge([
                'user' => $user,
            ]);

            // Check if the URL contains /admin
            if ($request->is('*/admin/*') && $user->role !== 'admin') {
                // Return an error response if the user is not an admin
                return response()->json(['message' => 'Access denied. Admins only.'], 403);
            }
        } else {
            // Return an unauthorized response if the user is not authenticated
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        return $next($request);
    }
}
