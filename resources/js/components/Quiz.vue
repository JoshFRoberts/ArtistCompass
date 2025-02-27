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
            class="col-12 col-md-6 mb-3"
        >
            <button
                class="btn btn-lg btn-block"
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
    <div v-if="quiz.currentQuiz.feedback && quiz.currentQuiz.feedback !== selectedOption" class="row mt-2 mb-4">
        <div class="col-12">
            <div class="alert" :class="quiz.currentQuiz.feedback === selectedOption ? 'alert-success' : 'alert-danger'">
                Korrekte Antwort: {{ quiz.currentQuiz.feedback }}
            </div>
        </div>
    </div>

    <!-- Next question button - full width -->
    <div class="row mt-4">
        <div class="col-12">
            <button
                class="btn btn-primary btn-lg btn-block"
                @click="quiz.fetchQuestion(); selectedOption = ''"
                :disabled="!quiz.currentQuiz.isAnswered"
            >
                Nächste Line
            </button>
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
