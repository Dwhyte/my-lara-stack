<?php

use App\Http\Controllers\DemoController;
use Illuminate\Support\Facades\Route;



Route::get('/', function () {
    return redirect()->route('demo.a');
})->name('home');


Route::get('/demo/a', [DemoController::class, 'demoA'])->name('demo.a');
Route::get('/demo/b', [DemoController::class, 'demoB'])->name('demo.b');

require __DIR__ . '/settings.php';
