<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class QuizRequest extends FormRequest
{
    public function rules(): array
    {
        return [
            'question' => ['required', 'numeric', 'exists:App\Models\QuizQuestion,id'],
            'answer' => ['required', 'string'],
        ];
    }
}
