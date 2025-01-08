<script setup>

import {NULL} from "sass";

const props = defineProps(
    {
        'artists': {
            type: Object,
            default() {
                return {
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
            }
        },
    }
)

props.artists.push({
    name: 'sop',
    authority: 5,
    economy: 5
})

console.log(props.artists)

</script>

<template>
    <div id="artist-grid">
        <div v-for="element in artists">
            <div class="grid-piece" :style="{ gridColumn: element.economy, gridRow: element.authority }"></div>
        </div>
    </div>
</template>

<style scoped>
#artist-grid {
    margin: 20px;
    height: 320px;
    aspect-ratio: 1;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    grid-gap: 2px;
    outline: 1px lightblue solid;
}

.grid-piece {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #B1D9E5;
    border: 1px solid #d7b0b0;
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
