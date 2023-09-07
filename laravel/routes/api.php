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

/* Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
}); */
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::apiResource('happy_travel', TravelController::class);
    Route::post('/update-avatar', [ AuthController::class, 'updateAvatar']);
});


Route::get('/happy_travel', [TravelController::class, 'search']);

Route::group(['middleware' => ['auth']], function() {
    Route::resource('roles', RoleController::class);
    Route::resource('users', UserController::class);
    
});


















// OJO RUTAS
// GET All destination http://localhost:8000/api/happy_travel
// GEL One destination http://localhost:8000/api/happy_travel/{id}
//PUT edit http://localhost:8000/api/happy_travel/{id} OJO lleva body y headers
// DELETE delete http://localhost:8000/api/happy_travel/{id} (requires headers)