<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Http\Requests\ProductRequest;
use App\Models\Reviews;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $products = Product::all();
        return Inertia('Welcome', ['products' => $products]);
    }



    public function store(ProductRequest $request)
    {
        $product = new Product();
        $product->titolo = $request->titolo;
        $product->descrizione = $request->descrizione;
        $product->prezzo = $request->prezzo;
        $product->prezzo_scontato = $request->prezzo_scontato;
        $product->categorie = $request->categorie;
        $imagePath = $request->file('img')->store('images', 'public');
        $product->img = $imagePath;
        $product->save();



        return redirect()->back()->with('message', 'Prodotto salvato con successo!');
    }

    public function show(Product $product)
    {

        return Inertia::render('ProductDetail', ['product' => $product]);
    }

    public function storeReview(Request $request)
    {

       
    }


}
