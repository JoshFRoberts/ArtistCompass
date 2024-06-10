<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome', [
        'title_text' => 'Homepage',
        'title_icon' => 'fas fa-user',
    ]);
});

/*
Route::get('/profile', function () {
    return view('Sites/FirstView', [
        'title_text'=> 'Profil'
    ]);
});
 */
Route::get('/compass', function () {
    return view('Sites/CompassView', [
        'title_text'=> 'Compass',
        'title_icon' => 'fas fa-compass',
    ]);
})->name('compass');

/*
Auth::routes();
 */

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
