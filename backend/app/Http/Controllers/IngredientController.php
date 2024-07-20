<?php

namespace App\Http\Controllers;

use App\Models\Ingredient;
use Illuminate\Http\Request;
use App\Http\Resources\IngredientResource;

class IngredientController extends Controller
{
    public function index()
    {
        $ingredients = Ingredient::all();
        return IngredientResource::collection($ingredients);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            // ... (ostala validacija po potrebi, npr. za jedinicu mere)
        ]);

        $ingredient = Ingredient::create($validatedData);
        return new IngredientResource($ingredient);
    }

    public function show(Ingredient $ingredient)
    {
        return new IngredientResource($ingredient);
    }

    public function update(Request $request, Ingredient $ingredient)
    {
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            // ... (ostala validacija)
        ]);

        $ingredient->update($validatedData);
        return new IngredientResource($ingredient);
    }

    public function destroy(Ingredient $ingredient)
    {
        $ingredient->delete();
        return response()->json(['message' => 'Ingredient deleted']);
    }
}
