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
            'opis' => $this->opis,
            'created_at' => $this->created_at ? $this->created_at->format('n/j/Y') : null,  // Format as "9/16/2024"
            'updated_at' => $this->updated_at ? $this->updated_at->format('n/j/Y') : null,  // Format as "9/16/2024"
            'written_by' => $this->written_by ?? 'Unknown',
            'sku' => $this->sku,
            'stock' => $this->stock,
            'price' => $this->price,
        ];
    }
}
