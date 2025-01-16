<?php

namespace App\Http\Controllers;

use App\Http\Resources\ArtistResource;
use App\Models\Artist;

class CompassController extends Controller
{
    public function index()
    {
        return view('Sites.CompassView',
            [
                'title' => 'Compass',
                'artists' => ArtistResource::collection(Artist::all())->toJson(),
            ]
        );
    }
}
