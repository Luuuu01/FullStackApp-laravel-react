<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CartItemResource;

class CartItemController extends Controller
{
    public function index(Request $request)
    {
        // Preuzmi sve CartItem stavke za ulogovanog korisnika
        $cartItems = CartItem::where('user_id', $request->user()->id)
                    ->with('recipe') // Učitaj povezane recepte
                    ->get();

        return response()->json(['cart_items' => $cartItems], 200);
    }

    public function store(Request $request)
{
    $request->validate([
        'recipe_id' => 'required|exists:recipes,id',
    ]);

    // Proveri da li korisnik već ima ovaj recept u korpi
    $existingCartItem = CartItem::where('user_id', $request->user()->id)
        ->where('recipe_id', $request->recipe_id)
        ->first();

    if ($existingCartItem) {
        return response()->json(['message' => 'Recipe already in cart'], 409); // Status 409 Conflict
    }

    // Kreiraj novi cart item
    $cartItem = CartItem::create([
        'user_id' => $request->user()->id,
        'recipe_id' => $request->recipe_id,
    ]);

    return response()->json(['cart_item' => $cartItem], 201);
}
    public function update(Request $request, CartItem $cartItem)
    {
        $this->authorize('update', $cartItem); // Provera autorizacije

        $validatedData = $request->validate([
            
        ]);

        $cartItem->update($validatedData);
        return new CartItemResource($cartItem);
    }

    public function destroy($id)
{
    $cartItem = CartItem::find($id);

    if (!$cartItem) {
        return response()->json(['message' => 'Cart item not found'], 404);
    }

    // Proveri da li korisnik pokušava da izbriše svoju stavku
    if ($cartItem->user_id !== auth()->id()) {
        return response()->json(['message' => 'Unauthorized'], 403);
    }

    $cartItem->delete();

    return response()->json(['message' => 'Cart item deleted successfully'], 200);
}


}
