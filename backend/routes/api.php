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

// Public routes (no authentication)
Route::get('/recipes/all', [RecipeController::class, 'allRecipes']);
Route::apiResource('recipes', RecipeController::class)->only('index', 'show');
Route::apiResource('ingredients', IngredientController::class)->only('index', 'show');

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('ingredients', IngredientController::class)->except('index', 'show');
    Route::get('/cart-items', [CartItemController::class, 'index']);
    Route::delete('/cart-items/{id}', [CartItemController::class, 'destroy']);
    Route::post('/cart-items', [CartItemController::class, 'store']);
    
    // Route to get the authenticated user's information
    Route::get('/user', [AuthController::class, 'getUser']); // Add this line
});

// Authentication routes
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
    Route::apiResource('recipes', RecipeController::class)->except('index', 'show'); // This already includes update (PUT)
    Route::post('/recipes', [RecipeController::class, 'store']); // Only admin can add recipes
});

// Image upload route
Route::post('/upload-image', [ImageUploadController::class, 'uploadImage']);
Route::get('/media-library', [ImageUploadController::class, 'listImages'])->middleware('auth:sanctum', 'admin');