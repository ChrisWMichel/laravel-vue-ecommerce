<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\URL;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\ProductListResource;

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
        
        $data = $request->validated();
        $data['created_by'] = $request->user()->id;
        $data['updated_by'] = $request->user()->id;

        /** @var \Illuminate\Http\UploadedFile $image */
        $image = $data['image'] ?? null;
        if ($image) {
            $relativePath = $this->saveImage($image);
            $data['image'] = URL::to(Storage::url($relativePath));
            $data['image_mime'] = $image->getClientMimeType();
            $data['image_size'] = $image->getSize();
        }

        $product = Product::create($data);

        return new ProductResource($product);

        //return new ProductResource(Product::create($request->validated()));
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

    private function saveImage(UploadedFile $image): string
    {
         $path = 'images/' . Str::random();
         $filename = $image->getClientOriginalName();

        if (!Storage::disk('public')->putFileAs($path, $image, $filename)) {
            throw new \Exception("Unable to save file \"{$filename}\"");
        }

        return "{$path}/{$filename}";
    }
}
