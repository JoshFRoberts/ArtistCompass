<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome', [
        'title_text' => 'Cocksip',
        'title_icon' => 'fas fa-user',
    ]);
});
