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
        left: `${props.artist.xPercent}%`,
        top: `${props.artist.yPercent}%`,
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
        {{ `${props.artist.economy}|${props.artist.authority}` }}
    </div>
</template>

<style scoped>

.artistSpot {
    border-radius: 50%;
    width: 20px;
    aspect-ratio: 1;
    position: absolute;
    z-index: 2;
    color: #1e1e1e;
}

</style>
