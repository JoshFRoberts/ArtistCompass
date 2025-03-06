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
        $options = collect([
            $this->false_answer_0,
            $this->false_answer_1,
            $this->false_answer_2,
        ])->random(2);

        $options[] = $this->correct_answer;

        $options = $options->shuffle();

        return [
            'id' => $this->id,
            'line' => $this->line,
            'options' => $options
        ];
    }
}
