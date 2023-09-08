<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function addToFavorites(Request $request, $travelId): JsonResponse
    {
        try {
            $user = $request->user();
            $travel = Travel::findOrFail($travelId);

            // Verificar si el usuario ya ha marcado este destino como favorito
            if ($user->favorites->contains($travel)) {
                $favorite = new Favorite();
                $favorite->user_id = $user->id;
                $favorite->travel_id = $travel->id;
                $favorite->save();
            }

            return response()->json(['success' => true, 'message' => '¡Destino agregado a favoritos!']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }

    public function removeFromFavorites(Request $request, $travelId): JsonResponse
    {
        try {
            $user = $request->user();
            $travel = Travel::findOrFail($travelId);

            // Verificar si el usuario ha marcado este destino como favorito
            $favorite = Favorite::where('user_id', $user->id)->where('travel_id', $travel->id)->first();
            if ($favorite) {
                $favorite->delete();
            }

            return response()->json(['success' => true, 'message' => '¡Destino eliminado de favoritos!']);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'error' => $e->getMessage()], 500);
        }
    }
}
