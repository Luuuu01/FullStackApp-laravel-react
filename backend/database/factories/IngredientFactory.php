<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Ingredient;
use Faker\Factory as Faker;



/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Ingredient>
 */
class IngredientFactory extends Factory
{
    protected $model = Ingredient::class; // Definisanje modela za koji se kreira factory

    public function definition()
    {
        $faker = Faker::create(); // Kreiranje nove instance Faker-a

        return [
            'name' => $this->faker->unique()->word(), // Generisanje jedinstvenih imena
            'unit' => $this->faker->randomElement(['g', 'kg', 'ml', 'l', 'kom']), // Nasumična merna jedinica
        ];
    }
}
