<?php

namespace App\Http\Controllers\API;

use App\Helpers\ApplicationResponse;
use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CategoryController extends Controller
{
    use ApplicationResponse;

    // Display a listing of the resource.
    public function index()
    {
        $categories = Category::all();
        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $categories
        );
    }

    // Store a newly created resource in storage.
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = Category::create([
            'name' => $request->name,
        ]);

        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $category
        );
    }

    // Display the specified resource.
    public function show(Category $category)
    {
        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $category
        );
    }

    // Update the specified resource in storage.
    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category->update([
            'name' => $request->name,
        ]);

        return $this->json(
            Response::HTTP_OK,
            "Success.",
            $category
        );
    }

    // Remove the specified resource from storage.
    public function destroy(Category $category)
    {
        $category->delete();
        return $this->json(
            Response::HTTP_OK,
            "Success.",
        );
    }
}
