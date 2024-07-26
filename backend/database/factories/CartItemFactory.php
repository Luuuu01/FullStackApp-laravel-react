<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\CartItem;
use App\Models\User;
use App\Models\Recipe;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CartItem>
 */
class CartItemFactory extends Factory
{
    protected $model = CartItem::class;

    public function definition()
    {
        return [
            'user_id' => User::factory(), // Povezivanje sa nasumičnim korisnikom
            'recipe_id' => Recipe::factory(), // Povezivanje sa nasumičnim receptom
            'quantity' => $this->faker->numberBetween(1, 5), // Nasumična količina
        ];
    }
}
