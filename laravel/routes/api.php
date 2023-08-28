<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TravelController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/happy_travel', [TravelController::class, 'index']);
Route::post('/happy_travel', [TravelController::class, 'store']);
Route::get('/happy_travel/{id}', [TravelController::class, 'show']);
Route::put('/happy_travel/{id}', [TravelController::class, 'update']);
Route::delete('/happy_travel/{id}', [TravelController::class, 'destroy']);


