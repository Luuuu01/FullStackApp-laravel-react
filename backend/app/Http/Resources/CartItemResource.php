<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CartItemResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'recipe' => new RecipeResource($this->recipe), // Uključujemo podatke o receptu
        ];
    }
}
