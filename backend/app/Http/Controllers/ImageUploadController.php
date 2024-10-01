<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;

class ImageUploadController extends Controller
{
    public function uploadImage(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'file' => 'required|image|max:2048', // Ensure the file is an image
            'custom_name' => 'required|string', // Ensure a custom name is provided
        ]);

        // Get the current year (e.g., '2024') and month (e.g., 'October')
        $currentYear = Carbon::now()->format('Y');
        $currentMonth = Carbon::now()->format('F');

        // Get the file from the request
        $file = $request->file('file');

        // Create a custom filename using the provided custom name
        $customName = $request->input('custom_name');
        $extension = $file->getClientOriginalExtension(); // Get the file extension
        $fileName = $customName . '.' . $extension; // Combine custom name and extension

        // Define the path for storage
        $path = "public/images/{$currentYear}/{$currentMonth}";

        // Store the file in the desired directory, creating it if necessary
        try {
            // Create the directory if it doesn't exist and store the file
            Storage::makeDirectory($path); // Create the directory structure
            $filePath = Storage::putFileAs($path, $file, $fileName);

            // Return the URL of the stored file
            return response()->json(['url' => Storage::url($filePath)], 200);
        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Image upload error: ' . $e->getMessage());
            return response()->json(['error' => 'Image upload failed'], 500);
        }
    }
}

