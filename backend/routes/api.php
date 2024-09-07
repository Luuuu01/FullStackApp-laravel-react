<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\RecipeController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\AuthController;


// Javne rute (bez autentifikacije)
Route::apiResource('recipes', RecipeController::class)->only('index', 'show');
Route::apiResource('ingredients', IngredientController::class)->only('index', 'show');
Route::post('/upload', 'App\Http\Controllers\ImageController@upload');

// Zaštićene rute (zahtevaju autentifikaciju)
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('recipes', RecipeController::class)->except('index', 'show');
    Route::apiResource('ingredients', IngredientController::class)->except('index', 'show');
    Route::apiResource('cart-items', CartItemController::class);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// Rute za autentifikaciju
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
