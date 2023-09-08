<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
     public function __construct()
     {
         $this->middleware('checkUserRole');
     }

    public function index(Request $request)
    {
        $user = Auth::user();
             if (!$user->hasRole('SuperAdmin')) {
                    return response()->json(['error' => 'No tienes permiso para editar este destino.'], 403);
                }
            
        $users = User::all();
        $usersWithRoles = [];

        foreach ($users as $user) {
            $userWithRoles = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'roles' => $user->getRoleNames(),
            ];

            $usersWithRoles[] = $userWithRoles;
        }

        return response()->json(['users' => $usersWithRoles]);
    }

    public function store(RegisterRequest $request)
{
    $user = Auth::user();
             if (!$user->hasRole('SuperAdmin')) {
                    return response()->json(['error' => 'No tienes permiso para editar este destino.'], 403);
                }
    $this->validate($request, [
        'name' => 'required',
        'email' => 'required|email|unique:users,email',
        'password' => 'required', 
        'roles' => 'required', 
    ]);

    $input = $request->all();
    $input['password'] = Hash::make($input['password']);

    $user = User::create($input);
    
    if (!empty($request->input('roles'))) {
        $user->assignRole($request->input('roles'));
    }
    
    return response()->json([
        'user' => $user,
        'message' => 'User created successfully',
    ], 201);
}

     public function show($id)
     {$user = Auth::user();
         if (!$user->hasRole('SuperAdmin')) {
                return response()->json(['error' => 'No tienes permiso para editar este destino.'], 403);
            }
          $user = User::findOrFail($id);
          return response()->json(['user' => $user], 200);
     }

    public function edit($id){
         $user = Auth::user();
         if (!$user->hasRole('SuperAdmin')) {
             return response()->json(['error' => 'No tienes permiso para editar este destino.'], 403);
         }
    $user = User::findOrFail($id);
    $roles = Role::pluck('name', 'name')->all();

    return response()->json(['user' => $user, 'roles' => $roles, 'userRole' => $user->getRoleNames()], 200);
}


public function update(Request $request, $id)
{$user = Auth::user();
    if (!$user->hasRole('SuperAdmin')) {
           return response()->json(['error' => 'No tienes permiso para editar este destino.'], 403);
       }
    $user = User::findOrFail($id);

    $this->validate($request, [
        'name' => 'required',
        'email' => 'required|email|unique:users,email,' . $id,
        'password' => 'nullable', 
        'roles' => 'required', 
    ]);

    $input = $request->except('roles');

    if (!empty($request->input('password'))) {
        $input['password'] = Hash::make($request->input('password'));
    }

    $user->update($input);

    $user->syncRoles($request->input('roles'));

    return response()->json(['message' => 'User updated successfully'], 200);
}

    public function destroy($id)
    {
        $user = Auth::user();
        if (!$user->hasRole('SuperAdmin')) {
               return response()->json(['error' => 'No tienes permiso para editar este destino.'], 403);
           }
         $user = User::findOrFail($id);
         $user->delete();

         return response()->json(['message' => 'User deleted successfully'], 200);
    }
}
