<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ModelNotFoundException;

class AuthController extends Controller {
    
    public function register(RegisterRequest $request) {

        $data = $request->validated();

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
        ]);
         $user->assignRole('User');
        $token = $user->createToken('auth_token')->plainTextToken;

        $cookie = cookie('token', $token, 60 * 24); 

        return response()->json([
            'user' => new UserResource($user),
        ])->withCookie($cookie);
    }

    
    public function login(LoginRequest $request) {
        $data = $request->validated();

        $user = User::where('email', $data['email'])->first();

        if (!$user || !Hash::check($data['password'], $user->password)) {
            return response()->json([
                'message' => 'Email or password is incorrect!'
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        $cookie = cookie('token', $token, 60 * 24);

        return response()->json([
            'user' => new UserResource($user),
        ])->withCookie($cookie);
    }

    
    public function logout(Request $request) {
        $request->user()->currentAccessToken()->delete();

        $cookie = cookie()->forget('token');

        return response()->json([
            'message' => 'Logged out successfully!'
        ])->withCookie($cookie);
    }

    
    public function user(Request $request) {
        return new UserResource($request->user());
    }

    public function updateAvatar(Request $request)
{
    $user = $request->user(); 
    
    if (!$user) {
        return response()->json(['error' => 'No se ha encontrado el usuario autenticado'], 401);
    }

    if ($request->hasFile('avatar')) {
        $request->validate([
            'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $file = $request->file('avatar');
        $fileName = time() . '_' . $file->getClientOriginalName();
        $file->storeAs('avatars', $fileName, 'public'); 

        $user->update(['image' => $fileName]);

        return response()->json(['success' => true, 'message' => 'Avatar actualizado exitosamente']);
    }

    return response()->json(['success' => false, 'message' => 'No se envió ningún archivo'], 400);
}
}
