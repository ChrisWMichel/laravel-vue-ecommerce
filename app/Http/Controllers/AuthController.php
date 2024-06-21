<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'remember' => 'boolean'
        ]);
    
        $remember = $credentials['remember'] ?? false;
        unset($credentials['remember']);
        if (!Auth::attempt($credentials, $remember)) {
            // Corrected the syntax here
            return response(['message' => 'Email or password is incorrect.'], 422);
        }
    
        $user = Auth::user();
        if (!$user->is_admin) {
            Auth::logout();
            return response(['message' => 'Unauthorized.'], 403);
        }
    
        $token = $user->createToken('admin')->plainTextToken;
    
        return response([
            'user' => $user,
            'token' => $token
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function logout()
    {
        /** @var \App\Models\User $user */
        // Auth::user()->tokens()->delete();
        // Auth::logout();
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response('', 204);
    }

    
}
