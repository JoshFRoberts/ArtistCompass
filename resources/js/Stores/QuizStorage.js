import {defineStore} from "pinia";
import axios from "axios";

export const useStorage = defineStore('quizStorage', {
    state: () => ({
        currentQuiz: {
            question: {
                id: 0,
                line: '',
            },
            options: ['a', 'b', 'c', 'd'],
            feedback: '',
            isAnswered: false,
            result: -1 // -1 is unanswered, 0 is false, 1 is true
        }
    }),
    actions: {
        fetchQuestion() {
            axios.get('/quiz/get-line')
                .then((response) => {
                    this.currentQuiz = response.data
                })
        },
        checkAnswer(option) {
            if (this.currentQuiz.isAnswered) return;

            this.currentQuiz.isAnswered = true;

            axios.post(`/quiz/${this.currentQuiz.question.id}`, {
                question: this.currentQuiz.question.id,
                answer: option
            })
                .then((response) => {
                    this.currentQuiz.feedback = response.data.correctAnswer;
            })
                .catch((error) => alert(error.response.data.message))
        }
    }
});
