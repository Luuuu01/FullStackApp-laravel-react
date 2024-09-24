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
    // Validate your incoming request...

    $recipe = new Recipe();
    $recipe->name = $request->name;
    $recipe->description = $request->description;
    $recipe->prep_time = $request->prep_time;
    $recipe->opis = $request->opis;

    // Handle image upload
    if ($request->hasFile('slika')) {
        $path = $request->file('slika')->store('images', 'public'); // Store image in public disk
        $recipe->slika = $path; // Save path relative to storage
    }

    $recipe->save();

    // Return the full URL for the image
    return response()->json([
        'message' => 'Recipe created successfully.',
        'recipe' => [
            'id' => $recipe->id,
            'name' => $recipe->name,
            'description' => $recipe->description,
            'prep_time' => $recipe->prep_time,
            'opis' => $recipe->opis,
            'slika' => url('storage/' . $recipe->slika), // Full URL
        ],
    ]);
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