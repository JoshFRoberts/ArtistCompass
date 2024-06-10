<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin \App\Models\Artist */
class ArtistResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'id' => $this->id,
            'name' => $this->name,
            'private_name' => $this->private_name,
            'age' => $this->age,
            'economy' => $this->economy,
            'authority' => $this->authority,
        ];
    }
}
