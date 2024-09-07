<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RecipeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'prep_time' => $this->prep_time, // Ako imaš kolonu prep_time
            'ingredients' => IngredientResource::collection($this->ingredients), // Uključujemo sastojke
            'slika' => $this->slika,
        ];
    }
}
