<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome', [
        'title_text' => 'Drück it (No Function)',
        'title_icon' => 'fas fa-user',
    ]);
});
