<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome', [
        'title_text' => 'Homepage',
        'title_icon' => 'fas fa-user',
    ]);
});

Route::get('/profile', function () {
    return view('Sites/FirstView', [
        'title_text'=> 'Profil'
    ]);
});