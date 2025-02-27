<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('quiz_questions', function (Blueprint $table) {
            $table->id();

            $table->string('line');
            $table->string('correct_answer');
            $table->string('false_answer_0');
            $table->string('false_answer_1');
            $table->string('false_answer_2');

            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quiz_questions');
    }
};
