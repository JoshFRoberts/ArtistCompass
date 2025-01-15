<script setup>

import {computed, ref} from "vue";
import {useElementSize} from "@vueuse/core";

const props = defineProps({
    index: {
        type: String,
        required: true
    },
    artist: {
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
    color: {
        type: String,
        default: '#ccc'
    },
    stroke: {
        type: String,
        default: '#aaa'
    },
})

const emits = defineEmits([
    'click',
    'mouseover',
    'mouseleave',
])

const spotStyle = computed(() => {
    return {
        background: `${props.color}`,
        border: `2px ${props.stroke} solid`,
        gridColumn: props.artist.gridColumn,
        gridRow: props.artist.gridRow,
    }
})

</script>

<template>
    <div
        :id="props.index"
        class="artistSpot"
        :style="spotStyle"
        @click="emits('click')"
        @mouseover="emits('mouseover')"
        @mouseleave="emits('mouseleave')">
    </div>
</template>

<style scoped>

.artistSpot {
    border-radius: 50%;
    aspect-ratio: 1;
    width: 25px;
    height: 25px;
    z-index: 2;
    opacity: 0.9;
}

</style>
