<?php

use App\Http\Controllers\QuizController;
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
Route::get('/compass', [\App\Http\Controllers\CompassController::class, 'index'])
    ->name('compass');

Route::get('/support', function () {
    return view('Sites.LinuxSupport', [
        'title_text'=> 'Linux Support',
        'title_icon' => 'fas fa-support',
    ]);
})->name('linux');

Route::post('/new-artist', [App\Http\Controllers\ArtistController::class, 'store'])
    ->name('newArtist');

Route::get('/quiz', [QuizController::class, 'index'])
    ->name('quiz');

Route::get('/quiz/get-line', [QuizController::class, 'getPunchline'])
    ->name('getLine');

Route::post('/quiz/{quizQuestion}', [QuizController::class, 'giveAnswer'])
    ->name('getAnswer');

/*
Auth::routes();
 */

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
