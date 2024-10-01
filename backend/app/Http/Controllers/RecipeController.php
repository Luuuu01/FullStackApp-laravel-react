<?php

namespace App\Http\Controllers;

use App\Http\Resources\RecipeResource;
use Illuminate\Http\Request;
use App\Models\Recipe;


class RecipeController extends Controller
{
    public function index(Request $request)
    {
        $recipes = Recipe::paginate(3);
        return RecipeResource::collection($recipes);
    }

    public function store(Request $request)
    {
        // Validate your incoming request...
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'prep_time' => 'required|integer',
            'opis' => 'nullable|string',
            'slika' => 'nullable|image|max:2048',
            'ingredients' => 'required|array',
            'ingredients.*.id' => 'required|integer|exists:ingredients,id',
            'ingredients.*.quantity' => 'required|integer|min:1',
        ]);

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

        $recipe->save(); // Save recipe first to get its ID

        // Handle ingredients (many-to-many relationship)
        $ingredients = $request->input('ingredients'); // Expecting ingredients as an array

        foreach ($ingredients as $ingredient) {
            // Attach ingredients with their quantity to the recipe
            $recipe->ingredients()->attach($ingredient['id'], ['quantity' => $ingredient['quantity']]);
        }

        // Return response with the full URL for the image
        return response()->json([
            'message' => 'Recipe created successfully.',
            'recipe' => [
                'id' => $recipe->id,
                'name' => $recipe->name,
                'description' => $recipe->description,
                'prep_time' => $recipe->prep_time,
                'opis' => $recipe->opis,
                'slika' => $recipe->slika ? url('storage/' . $recipe->slika) : null, // Full URL or null
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