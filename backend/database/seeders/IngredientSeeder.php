<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Ingredient;
use Database\Factories\IngredientFactory;
use Faker\Factory as Faker;

class IngredientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // $faker = Faker::create(); // Kreiranje nove instance Faker-a

        $ingredients = [
            ['name' => 'Brašno', 'unit' => 'g'],
            ['name' => 'Šećer', 'unit' => 'g'],
            ['name' => 'Jaja', 'unit' => 'kom'],
            ['name' => 'Mleko', 'unit' => 'ml'],
            ['name' => 'Paradajz', 'unit' => 'kom'],
            ['name' => 'Mocarela sir', 'unit' => 'g'],
            ['name' => 'Piletina', 'unit' => 'g'],
            ['name' => 'Brokoli', 'unit' => 'g'],
            // ... dodaj ostale sastojke po potrebi
        ];

        foreach ($ingredients as $ingredient) {
            Ingredient::create($ingredient);
        }
        // Ingredient::factory()->count(20)->create();
        // $this->faker->unique(true); // Resetuje unique generator za sledeće izvršavanje seedera



    }
}
