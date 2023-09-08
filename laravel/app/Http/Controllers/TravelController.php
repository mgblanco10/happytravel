<?php

namespace App\Http\Controllers;

use App\Models\Travel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class TravelController extends Controller
{
   
    public function index()
    {
        $travels = Travel::all();
        return response()->json($travels);
    }

    
    public function store(Request $request): JsonResponse
    {
        try {
    
            $request->validate([
                'name' => 'required',
                'location' => 'required',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif',
                'description' => 'required'
            ]);

            $imagePath = null;
     
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('images'), $imageName);
                $imagePath = 'images/' . $imageName;
            }
            $user = Auth::user();

            $travel = Travel::create([
                'name' => $request->input('name'),
                'location' => $request->input('location'),
                'image' =>$imagePath,
                'description' => $request->input('description'), 
                'user_id' => $user -> id,
            ]);
    
            return response()->json(['success' => true, 'message' => '¡Destino actualizado exitosamente!']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['success' => false, 'error' => 'El destino no se encontró.'], 404);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

  
    public function show($id): JsonResponse
    {
        try {
            $travel = Travel::findOrFail($id);
            return response()->json($travel);
        } catch (\Exception $e) {
            return response()->json(['error' => 'El destino no se encontró.'], 404);
        }
    }

    
    public function edit($id): JsonResponse
    {
        try {
            $travel = $this->findTravelOrFail($id);
            return response()->json($travel);
        } catch (\Exception $e) {
            return response()->json(['error' => 'El destino no se encontró.'], 404);
        }
    }
    
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $travel = Travel::findOrFail($id);
    
            $request->validate([
                'name' => 'required',
                'location' => 'required',
                'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
                'description' => 'required'
            ]);
    
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('images', 'public');
                
                if ($travel->image) {
                    Storage::disk('public')->delete($travel->image);
                }
                $travel->image = $imagePath;
            }
    
            $travel->update([
                'name' => $request->input('name'),
                'location' => $request->input('location'),
                'description' => $request->input('description')
            ]);
    
            return response()->json(['success' => true, 'message' => '¡Destino actualizado exitosamente!']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['success' => false, 'error' => 'El destino no se encontró.'], 404);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
     

    public function destroy($id): JsonResponse
    {
        try {
            $travel = Travel::findOrFail($id);

            if ($travel->user_id !== Auth::id()) {
                return response()->json(['success' => false, 'error' => 'No tienes permiso para eliminar este destino.']);
            }

            if ($travel->image) {
                Storage::disk('public')->delete($travel->image);
            }

            $travel->delete();

            return response()->json(['success' => true, 'message' => '¡Destino eliminado exitosamente!']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['success' => false, 'error' => 'El destino no se encontró.'], 404);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }


    public function search(Request $request)
    {
        $searchTerm = $request->input('search');

        $travels = Travel::where(function ($query) use ($searchTerm) {
            $query->where('name', 'like', '%' . $searchTerm . '%')
                ->orWhere('location', 'like', '%' . $searchTerm . '%');
        })->get();

        return response()->json($travels);
    }
}
