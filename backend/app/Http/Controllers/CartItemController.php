<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CartItemResource;

class CartItemController extends Controller
{
    public function index()
    {
        $cartItems = CartItem::where('user_id', Auth::id())->get();
        return CartItemResource::collection($cartItems);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'recipe_id' => 'required|exists:recipes,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem = CartItem::create([
            'user_id' => Auth::id(),
            ...$validatedData,
        ]);

        return new CartItemResource($cartItem);
    }
    public function update(Request $request, CartItem $cartItem)
    {
        $this->authorize('update', $cartItem); // Provera autorizacije

        $validatedData = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cartItem->update($validatedData);
        return new CartItemResource($cartItem);
    }

    public function destroy(CartItem $cartItem)
    {
        $this->authorize('delete', $cartItem); // Provera autorizacije

        $cartItem->delete();
        return response()->json(['message' => 'Cart item deleted']);
    }

}
