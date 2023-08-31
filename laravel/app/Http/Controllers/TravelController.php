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
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $travels = Travel::all();
        return response()->json($travels);
    }

    /**
     * Store a newly created resource in storage.
     */
    // public function store(Request $request): JsonResponse
    // {
    //     $request->validate([
    //         'name' => 'required',
    //         'location' => 'required',
    //         // 'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
    //         'description' => 'required'
    //     ]); 

        
    //     $travel = Travel::create(
    //         $request->all()
    //         // 'name' => $request->name,
    //         // 'location' => $request->location,
    //         // 'description' => $request->description,
    //         // 'privacy' => 'private'
    //         // // 'user_id' => Auth::id()

           
    //     );

    //     return response()->json(['message' => 'Travel added successfully', 'data' => $travel]);
    // }
    public function store(Request $request): JsonResponse
    {
        try {
            // $travel = Travel::findOrFail($id);
    
            $request->validate([
                'name' => 'required',
                'location' => 'required',
                'image' => 'required',
                'description' => 'required'
            ]);

            $imagePath = null;
     
            if ($request->hasFile('image')) {
             $image = $request->file('image');
             $imageName = time() . '.' . $image->getClientOriginalExtension();
             $image->move(public_path('images'), $imageName);
             $imagePath = 'images/' . $imageName;
            }

            // if ($request->hasFile('image')) {
            //     $imagePath = $request->file('image')->store('images', 'public');
            //     // Delete the old image file if it exists
            //     if ($travel->image) {
            //         Storage::disk('public')->delete($travel->image);
            //     }
            //     $travel->image = $imagePath;
            // }
    
            $travel = Travel::create([
                'name' => $request->input('name'),
                'location' => $request->input('location'),
                'image' =>$request->input('image'),
                'description' => $request->input('description')
            ]);

            if ($imagePath) {
                $travel['image'] = $imagePath;
            }

    
            return response()->json(['success' => true, 'message' => '¡Destino actualizado exitosamente!']);
        } catch (ModelNotFoundException $e) {
            return response()->json(['success' => false, 'error' => 'El destino no se encontró.'], 404);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        try {
            $travel = Travel::findOrFail($id);
            return response()->json($travel);
        } catch (\Exception $e) {
            return response()->json(['error' => 'El destino no se encontró.'], 404);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id): JsonResponse
    {
        try {
            $travel = $this->findTravelOrFail($id);
            return response()->json($travel);
        } catch (\Exception $e) {
            return response()->json(['error' => 'El destino no se encontró.'], 404);
        }
    }
    /**
     * Update the specified resource in storage.
     */
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
                // Delete the old image file if it exists
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
     /**
     * Update the specified resource in destroy.
     */

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
   $travels = Travel::search($request->search);
//    return view('destinations', ['destinations' => $destinations]);
   return response()->json($travels);
}
    
}
