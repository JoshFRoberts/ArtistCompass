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

const imgWidth = ref(300);
const imgHeight = ref(500);

const imageStyle = computed(() => {
    return {
        width: `${imgWidth.value * transformationRatio.value}px`,
        height: `${imgHeight.value * transformationRatio.value}px`
    }
})

const transformationRatio = computed(() => {
    let widthTrans = compassContainerRect.width.value / imgWidth.value;
    let heightTrans = compassContainerRect.height.value / imgHeight.value;

    if (widthTrans < heightTrans) {
        return widthTrans;
    }
    else if (widthTrans > heightTrans) {
        return heightTrans;
    }
    else {
        return 1;
    }
})

onMounted(() => {
    updateImageDimensions();
    data.artists = props.artists;
})

const updateImageDimensions = () => {
    img.value.src = CompassImage

    img.value.onload = () => {
        imgWidth.value = img.value.width;
        imgHeight.value = img.value.height;
    }
}

function saveArtistPosition() {

    emits('SpotHovered', {id: 0});

    //TODO: Emit Event to Server To Save Given Artist
}

function artistClicked(artist) {
    console.log(artist)
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
             alt="Raumplan">

        <ArtistSpot
            v-for="artist in data.artists" :key="artist.id"
            :index="SpotHelper.reduceDeskName(artist.name)"
            color="#CECECE"
            stroke="#b1d9e5"
            :artist="SpotHelper.transposeSpot(transformationRatio, artist)"
            @mouseover="emits('SpotHovered', artist)"
            @click="artistClicked(artist)"
        />

    </div>
</template>

<style scoped>

#compassContainer {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 700px;
}

#Map {
    user-select: none;
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
}

img {
    z-index: 0;
    opacity: 0.8;
}

</style>
