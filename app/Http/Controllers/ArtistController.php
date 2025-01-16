<?php

namespace App\Http\Controllers;

use App\Http\Requests\ArtistRequest;
use App\Http\Resources\ArtistResource;
use App\Models\Artist;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    public function store(ArtistRequest $request)
    {
        $data = $request->validated();

        Artist::create($data);

        return response([
            'data' => ArtistResource::collection(Artist::all()),
            'success' => true,
            'status' => 200,
        ]);
    }
}
