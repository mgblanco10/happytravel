<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TravelController extends Controller
{
    public function index()
    {
        $travels = Travel::all();
        return response()->json($travels);
    }

    public function store(Request $request)
    {
        $request->validate([
            // Validación
        ]);
    
        // Lógica para almacenar el nuevo viaje
    
        return response()->json(['message' => '¡Destino agregado exitosamente!']);
    }

    public function show($id)
    {
        try {
            $travel = Travel::findOrFail($id);
            return response()->json($travel);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'El destino no se encontró.'], 404);
        }
    }

    public function update(Request $request, $id)
    {
        $travel = Travel::findOrFail($id);

        $request->validate([
        // Validación
        ]);

    // Lógica para actualizar el viaje

        return response()->json(['message' => '¡Destino actualizado exitosamente!']);
    }

    public function destroy($id)
    {
        try {
            $travel = Travel::findOrFail($id);

            if ($travel->user_id !== Auth::user()->id) {
                return response()->json(['error' => 'No tienes permiso para eliminar este destino.'], 403);
            }

        // Lógica para eliminar el destino

            return response()->json(['message' => '¡Destino eliminado exitosamente!']);
        } catch (ModelNotFoundException $e) {
        return response()->json(['error' => 'El destino no se encontró.'], 404);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function search(Request $request)
    {
        $searchTerm = $request->input('search');

        $travels = Travel::where('name', 'like', '%' . $searchTerm . '%')
                      ->orWhere('location', 'like', '%' . $searchTerm . '%')
                      ->get();

        return response()->json($travels);
    }

}
