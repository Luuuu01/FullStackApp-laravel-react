<?php

namespace App\Http\Controllers;

use App\Http\Resources\RecipeResource;
use Illuminate\Http\Request;
use App\Models\Recipe;


class RecipeController extends Controller
{
    public function index()
    {
        $recipes = Recipe::all();
        return RecipeResource::collection($recipes); // Koristimo Resource za formatiranje
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $recipe = Recipe::create($validatedData);
        return new RecipeResource($recipe);
    }

    public function show(Recipe $recipe)
    {
        return new RecipeResource($recipe);
    }

    public function update(Request $request, Recipe $recipe)
    {
        $validatedData = $request->validate([
            'name' => 'string|max:255',
            'description' => 'string',
            'prep_time' => 'integer|nullable', // Dodata validacija za prep_time
        ]);

        $recipe->update($validatedData);
        return new RecipeResource($recipe);
    }

    public function destroy(Recipe $recipe)
    {
        $recipe->delete();
        return response()->json(['message' => 'Recipe deleted']);
    }
}