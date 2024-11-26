<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;
    protected $fillable = [

        'titolo',
        'prezzo',
        'prezzo_scontato',
        'img',
        'descrizione',
        'categorie',
        'img',
        


    ];
    protected $casts = [
        'categorie' => 'array',

    ];



    public function reviews()
    {
        return $this->hasMany(Review::class);
    }
    public function products()
    {
        return $this->hasMany(Product::class);
    }
 
 
}
