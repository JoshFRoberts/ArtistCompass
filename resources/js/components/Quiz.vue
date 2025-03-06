<script setup>

import {useStorage as quizStore } from "../Stores/QuizStorage.js";
import {onMounted, ref} from "vue";

const quiz = quizStore();

const selectedOption = ref(null);

onMounted(() => {
    quiz.fetchQuestion()
})

</script>

<template>

<div class="container quiz-container">
    <!-- Question row - full width -->
    <div class="row mb-4">
        <div class="col-12">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">{{ quiz.currentQuiz.question.line }}</h3>
                </div>
            </div>
        </div>
    </div>

    <!-- Options row - 2 columns, multiple rows based on options -->
    <div class="row">
        <div
            v-for="(option, index) in quiz.currentQuiz.question.options"
            :key="index"
            class="col-12 mb-3"
        >
            <button
                class="btn btn-lg btn-block text-center"
                :class="[
                    selectedOption === option
                        ? (quiz.currentQuiz.feedback === option ? 'btn-success' : 'btn-danger')
                        : 'btn-outline-primary',
                        { 'disabled': quiz.currentQuiz.isAnswered },
                        { 'btn-dark': !quiz.currentQuiz.isAnswered}
                ]"
                @click="selectedOption = option; quiz.checkAnswer(option)"
            >
                {{ option }}
            </button>
        </div>
    </div>

    <!-- Feedback row - full width -->
    <div class="row mt-2 mb-4">
        <div class="col-12">
            <div class="row">
                <div class="flex-grow-1">
                    <div class="alert alert-danger"
                        v-if="quiz.currentQuiz.feedback && quiz.currentQuiz.feedback !== selectedOption">
                        Korrekte Antwort: {{ quiz.currentQuiz.feedback }}
                    </div>
                </div>
                <div class="flex-grow-1">
                    <button
                        v-if="quiz.currentQuiz.isAnswered"
                        class="btn btn-primary btn-block"
                        @click="selectedOption = ''; quiz.fetchQuestion()"
                    >
                        Nächste Line
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped>

.quiz-container {
    max-width: 800px;
    margin: 2rem auto;
}

.btn-block {
    display: block;
    width: 100%;
    padding: 1rem;
    text-align: left;
    margin-bottom: 0.5rem;
}

.card {
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

</style>
