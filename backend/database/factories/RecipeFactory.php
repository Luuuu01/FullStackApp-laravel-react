<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Recipe;
use App\Models\Ingredient;



/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Recipe>
 */
class RecipeFactory extends Factory
{
    protected $model = Recipe::class; // Ovo treba da bude Recipe::class

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'prep_time' => $this->faker->numberBetween(10, 60),
        ];
    }
    public function configure()
    {
        return $this->afterCreating(function (Recipe $recipe) {
            $ingredientIds = Ingredient::inRandomOrder()->limit(3)->pluck('id'); // Uzima 3 nasumična ID-ja sastojaka
            $recipe->ingredients()->attach($ingredientIds); // Povezuje postojeće sastojke
        });
    }

}
