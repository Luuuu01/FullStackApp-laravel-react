<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Recipe;
use Database\Factories\RecipeFactory;
use App\Models\Ingredient;
use Illuminate\Database\Eloquent\Factories\Factory;



class RecipeSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Recipe::create([
            'name' => 'Pizza',
            'description' => 'Ukusna pizza',
            'prep_time' => 30,
        ]);
        Recipe::create([
            'name' => 'Piletina sa povrćem',
            'description' => 'Zdravo i ukusno jelo sa piletinom i sezonskim povrćem.',
            'prep_time' => 45,
        ]);

        Recipe::create([
            'name' => 'Čokoladni kolač',
            'description' => 'Sočan čokoladni kolač za sve ljubitelje čokolade.',
            'prep_time' => 60,
        ]);

        $pizza = Recipe::where('name', 'Pizza')->first();
        $brasno = Ingredient::where('name', 'Brašno')->first();
        $paradajz = Ingredient::where('name', 'Paradajz')->first();
        $sir = Ingredient::where('name', 'Mocarela sir')->first();

        $pizza->ingredients()->attach($brasno, ['quantity' => 300]);
        $pizza->ingredients()->attach($paradajz, ['quantity' => 2]);
        $pizza->ingredients()->attach($sir, ['quantity' => 200]);

        // Recipe::factory()->count(10)->create();

    }
}
