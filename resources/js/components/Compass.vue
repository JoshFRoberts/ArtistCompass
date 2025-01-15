<script setup>

import { computed, ref, onMounted } from "vue";
import { useStorage } from "../Stores/ArtistStorage.js";
import { ArtistSpotHelper } from "../Helpers/ArtistSpotHelper.js";
import ArtistSpot from "./ArtistSpot.vue";
import CompassImage from '../../Img/Compass/political_compass.png'
import { useElementSize, useImage } from "@vueuse/core";
import axios from "axios";

const props = defineProps(
    {
        artists: {
            type: Array,
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

const emits = defineEmits([
    'SpotClicked',
    'SpotHovered',
]);


const data = useStorage();
const SpotHelper = new ArtistSpotHelper();

const compassContainer = ref(null);
const domImage = ref(null);
const img = ref(new Image());

const { isLoading } = useImage({ src: img.value.src})

const compassContainerRect = useElementSize(compassContainer);

const imgWidth = ref(771);
const imgHeight = ref(771);

const imageStyle = computed(() => {
    return {
        width: `${compassContainerRect.width.value}px`,
        height: `${compassContainerRect.height.value}px`
    }
})

onMounted(() => {
    updateImageDimensions();
    data.artists = props.artists;
})

const updateImageDimensions = () => {
    img.value.src = CompassImage

    img.value.onload = () => {
        imgWidth.value = compassContainerRect.width.value;
        imgHeight.value = compassContainerRect.height.value;
    }
}

function saveArtistPosition() {

    emits('SpotHovered', {id: 0});

    //TODO: Emit Event to Server To Save Given Artist
}

function artistClicked(artist) {
    console.log(artist)
}

function getColor() {
    let retVal = '#'

}

function getStroke() {
    let retVal = '#'
}

</script>

<template>
    <div ref="compassContainer"
         id="compassContainer"
         class="container">

        <span v-if="isLoading">Loading...</span>
        <img v-else-if="img.src !== ''"
             ref="domImage"
             id="Map" :src="img.src"
             :style="imageStyle"
             alt="Compass">

        <ArtistSpot
            v-for="artist in data.artists" :key="artist.id"
            :index="SpotHelper.reduceName( artist.name)"
            color="#CECECE"
            stroke="#d7b0b0"
            :artist="SpotHelper.transposeSpot(imgWidth, imgHeight, artist)"
            :image="img"
            @mouseover="emits('SpotHovered', artist)"
            @click="artistClicked(artist)"
        />

    </div>
</template>

<style scoped>

#compassContainer {
    padding: 0;
    display: grid;
    grid-template-rows: repeat(20, 1fr);
    grid-template-columns: repeat(20,1fr);
    width: 100%;
    height: 100%;
    aspect-ratio: 1;
    place-items: center;
}

#Map {
    position: absolute;
    user-select: none;
    pointer-events: none;
    aspect-ratio: 1;
}

img {
    z-index: 0;
    opacity: 0.8;
}

</style>
