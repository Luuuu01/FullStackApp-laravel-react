<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Ingredient extends Model
{
    protected $fillable = ['name', 'unit'];

    public function recipes()
    {
        return $this->belongsToMany(Recipe::class)->withPivot('quantity');
    }
}
