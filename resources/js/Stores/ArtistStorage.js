import {defineStore} from "pinia";
import axios from "axios";

export const useStorage = defineStore('artistStorage', {
    state: () => ({
        artists: [
            {
                id: {
                    type: Number,
                    default: -1
                },
                name: {
                    type: String,
                    default: ''
                },
                private_name: {
                    type: String,
                    default: ''
                },
                age: {
                    type: Number | null,
                    default: null
                },
                economy: {
                    type: Number,
                    default: 0
                },
                authority: {
                    type: Number,
                    default: 0
                },
            }
        ]
    }),
    actions: {

    }
});
