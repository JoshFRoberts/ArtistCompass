<?php

namespace App\Http\Resources;

use App\Models\QuizQuestion;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/** @mixin QuizQuestion */
class QuizQuestionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $options = [
            $this->correct_answer,
            $this->false_answer_0,
            $this->false_answer_1,
            $this->false_answer_2,
        ];

        shuffle($options);

        return [
            'id' => $this->id,
            'line' => $this->line,
            'options' => $options
        ];
    }
}
