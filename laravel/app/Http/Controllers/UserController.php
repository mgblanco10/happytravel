<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class UserController extends Controller
{
    public function updateAvatar(Request $request){
    {
        try {
            $user = Auth::user(); 

            $request->validate([
                'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
            $imagePath = null;

            if ($request->hasFile('avatar')) {
                $image = $request->file('avatar');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                // $image->storeAs('avatars', $imageName, 'public'); 
                $image->move(public_path('avatars'), $imageName);
                $imagePath = 'avatars/' . $imageName;

                // $user->update(['image' => 'avatars/' . $imageName]);
            }

            $user->update(['image' => $imagePath]);

            return response()->json(['success' => true, 'message' => 'Avatar actualizado exitosamente']);
        } catch (\Exception $e) {
            dd($e->getMessage());
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
    }
}


    