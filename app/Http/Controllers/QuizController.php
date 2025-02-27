<?php

namespace App\Http\Controllers;

use App\Http\Requests\QuizRequest;
use App\Http\Resources\QuizQuestionResource;
use App\Models\QuizQuestion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuizController extends Controller
{
    public function index()
    {
        return view('quiz', [
            'title_text' => 'Das Punchlinequiz',
            'title_icon' => 'fa-question-circle',
        ]);
    }

    public function getPunchline() {

        $number = random_int(
            DB::table('quiz_questions')->min('id'),
            DB::table('quiz_questions')->max('id')
        );

        $quizQuestion = QuizQuestion::find($number);

        return [
            'question' => new QuizQuestionResource($quizQuestion),
            'feedback' => '',
            'isAnswered' => false,
            'result' => -1
        ];
    }

    public function giveAnswer(QuizQuestion $quizQuestion) {

        return [
            'correctAnswer' => $quizQuestion->correct_answer,
        ];
    }
}
