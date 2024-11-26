<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use App\Http\Requests\ProductRequest;
use App\Models\Review;
use App\Models\User;
use Illuminate\Container\Attributes\Auth;

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
        $reviews= Review::all();
        $user = User::whereHas('reviews')->get(['id', 'name']);
              
        return Inertia::render('ProductDetail', ['product' => $product, 'user' => $user,'reviews' => $reviews]);
    }

    public function storeReview(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|exists:products,id',
            'titolo' => 'required|string|min:1',
            'descrizione' => 'required|string',
        ]);

        $request->user()->reviews()->create($validated);

        return redirect()->back()->with('message', 'Recensione aggiunta con successo!');


    }



}
