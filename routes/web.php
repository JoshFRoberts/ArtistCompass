<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome', [
        'title_text' => 'Willkommen beim Künstler-Kompass',
        'title_icon' => 'fa fa-fw fa-compass',
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

Route::get('/support', function () {
    return view('Sites.LinuxSupport', [
        'title_text'=> 'Linux Support',
        'title_icon' => 'fas fa-support',
    ]);
})->name('linux');

/*
Auth::routes();
 */

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
