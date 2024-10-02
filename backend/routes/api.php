<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\IngredientController;
use App\Http\Controllers\CartItemController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImageUploadController;

// Javne rute (bez autentifikacije)
Route::get('/recipes/all', [RecipeController::class, 'allRecipes']);

Route::apiResource('recipes', RecipeController::class)->only('index', 'show');
Route::apiResource('ingredients', IngredientController::class)->only('index', 'show');

// Route for fetching all recipes

// Zaštićene rute (zahtevaju autentifikaciju)
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('recipes', RecipeController::class)->except('index', 'show'); // For authenticated users
    Route::apiResource('ingredients', IngredientController::class)->except('index', 'show');
    Route::get('/cart-items', [CartItemController::class, 'index']);
    Route::delete('/cart-items/{id}', [CartItemController::class, 'destroy']);
    Route::post('/cart-items', [CartItemController::class, 'store']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});

// Rute za autentifikaciju
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::get('password/reset', [ForgotPasswordController::class, 'showLinkRequestForm'])->name('password.request');
Route::post('password/email', [ForgotPasswordController::class, 'sendResetLinkEmail'])->name('password.email');
Route::get('password/reset/{token}', [ResetPasswordController::class, 'showResetForm'])->name('password.reset');
Route::post('password/reset', [ResetPasswordController::class, 'reset'])->name('password.update');

// Admin-specific routes
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::post('/recipes', [RecipeController::class, 'store']); // Samo admin može dodati recept
});

// Image upload route
Route::post('/upload-image', [ImageUploadController::class, 'uploadImage']);
