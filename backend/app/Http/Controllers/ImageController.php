<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage; // Za rad sa fajlovima

class ImageController extends Controller
{
    public function upload(Request $request)
    {
        // 1. Validacija
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048', // Prilagodite po potrebi
        ]);

        // 2. Čuvanje slike
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension(); // Generisanje jedinstvenog imena

            // Čuvanje u lokalnom direktorijumu (npr. storage/app/public/images)
            $path = $image->storeAs('public/images', $imageName); 

            // Ili čuvanje u cloud storage-u (npr. Amazon S3)
            // $path = Storage::disk('s3')->put('images', $image, 'public');

            // 3. Vraćanje odgovora
            return response()->json(['imagePath' => Storage::url($path)]); // Vratite putanju do slike
        }

        return response()->json(['error' => 'Greška pri postavljanju slike.'], 500);
    }
}