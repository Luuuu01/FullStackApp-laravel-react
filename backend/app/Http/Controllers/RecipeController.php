<?php

namespace App\Http\Controllers;

use App\Http\Resources\RecipeResource;
use Illuminate\Http\Request;
use App\Models\Recipe;


class RecipeController extends Controller
{
    public function index(Request $request)
    {
        // $query = Recipe::query();

        // if ($request->has('category')) {
        //     $query->where('category_id', $request->category);
        // }

        // if ($request->has('ingredient')) {
        //     $query->whereHas('ingredients', function ($q) use ($request) {
        //         $q->where('ingredient_id', $request->ingredient);
        //     });
        // }

        // $recipes = $query->paginate(10);
        $recipes=Recipe::all();
        return RecipeResource::collection($recipes);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'prep_time' => 'nullable|integer', // Prep_time može biti null, pošto je nullable
            'slika' => 'nullable|string', // Slika je nullable i string
            'opis' => 'nullable|string',  // Opis je nullable
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
        if ($recipe->user_id !== auth()->id()) {
            abort(403, 'Unauthorized');
        }
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