<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class QuizQuestion extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'line',
        'correct_answer',
        'false_answer_0',
        'false_answer_1',
        'false_answer_2',
    ];
}
