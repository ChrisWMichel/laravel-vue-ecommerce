<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       $search = request('search', '');
       $perPage = request('perPage', 10);
       $sortField = request('sortField', 'updated_at');
       $sortDirection = request('sortDirection', 'desc');

       $query = Product::query();
       $query->orderBy($sortField, $sortDirection);
         if ($search) {
              $query->where('title', 'like', "%$search%")
                    ->orWhere('description', 'like', "%$search%");
            }

        return ProductListResource::collection(($query->paginate($perPage)));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        return new ProductResource(Product::create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        return new ProductResource($product);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, Product $product)
    {
        $product->update($request->validated());
        return new ProductResource($product);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $product->delete();
        return response()->noContent();
    }
}
