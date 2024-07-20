<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\RecipeController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\CartItemController;


Route::apiResource('recipes', RecipeController::class);
Route::apiResource('ingredients', IngredientController::class);
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('cart-items', CartItemController::class);
});


Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
