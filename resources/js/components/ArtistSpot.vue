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
    transformationRatio: {
        type: Number,
        default: 1,
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
        transform: `translate(${props.artist.economy}px, ${props.artist.authority}px)`
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
        @mouseleave="emits('mouseleave')"
    />
</template>

<style scoped>

.artistSpot {
    display: grid;
    place-items: center;
    position: absolute;
    z-index: 2;
}

.chair-rectangle {
    border-top-left-radius: 35%;
    border-top-right-radius: 35%;
    z-index: 3;
}

.artist-name-span {
    pointer-events: none;
    user-select: none;
    font-weight: bold;
    z-index: 3;
}

</style>
