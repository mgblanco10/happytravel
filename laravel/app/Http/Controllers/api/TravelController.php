<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Travel;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class TravelController extends Controller
{
    public function index()
    {
        $travels = Travel::all();

        return response()->json($travels);
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

    // ... otros métodos ...
}