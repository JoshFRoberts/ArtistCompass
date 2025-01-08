<?php

namespace Database\Seeders;

use App\Models\Artist;
use Illuminate\Database\Seeder;

class ArtistSeeder extends Seeder
{
    public function run(): void
    {
        Artist::create([
            'name' => 'Milli Dance',
            'authority' => -10,
            'economy' => -10,
        ]);

        Artist::create([
            'name' => 'Makss Damage',
            'authority' => 10,
            'economy' => 10,
        ]);
    }
}
