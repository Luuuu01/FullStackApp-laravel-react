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
    Route::get('/cart-items', [CartItemController::class, 'index'])->middleware('auth:sanctum');
    Route::delete('/cart-items/{id}', [CartItemController::class, 'destroy'])->middleware('auth:sanctum');
    Route::post('/cart-items/', [CartItemController::class, 'store'])->middleware('auth:sanctum');
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


Route::middleware('auth:sanctum')->get('/cart', [CartItemController::class, 'index']);
Route::middleware('auth:sanctum')->delete('/cart/{item}', [CartItemController::class, 'remove']);



