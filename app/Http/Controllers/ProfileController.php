<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Product;
use App\Models\Review;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function dashboardView()
    {
        $userId = Auth::id();
        $reviews = Review::where('user_id', $userId)->get();
        $products = Product::all();
        $reviewedProductIds = $reviews->pluck('product_id')->unique();

        // Filtra i prodotti che corrispondono agli ID delle recensioni
        $filteredProducts = $products->filter(function ($product) use ($reviewedProductIds) {
            return $reviewedProductIds->contains($product->id);
        });

        // Ottieni solo l'ID e il nome dei prodotti
        $prodRev = $filteredProducts->map(function ($product) {
            return [
                'id' => $product->id,
                'titolo' => $product->titolo,
            ];
        });

        return Inertia::render('Dashboard', ['reviews' => $reviews, 'prodRev'=>$prodRev]);
    }
}
