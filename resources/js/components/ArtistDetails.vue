<script setup>

import {ref} from "vue";
import axios from "axios";
import {useStorage} from "../Stores/ArtistStorage.js";

const name = ref('')
const privateName = ref('')
const economy = ref('')
const authority = ref('')

const data = useStorage();

function validateData() {

    axios.post(
        '/new-artist',
        {
            name: name.value,
            private_name: privateName.value,
            economy: economy.value,
            authority: authority.value
        }
    ).then((response) => {
         data.artists = response.data.data;
    }).finally(() => {
        name.value = ''
        privateName.value = ''
        economy.value = ''
        authority.value = ''
    })
}

</script>

<template>
    <div id="artist-details">
        <h5>Neue Kunstperson</h5>
        <br>

        <div class="form-group">
            <label for="name">Name</label>
            <input v-model="name" type="text" class="form-control" name="name" id="name"
                   aria-describedby="ArtistName"
                   placeholder="Kollegah">
        </div>

        <br>

        <div class="form-group">
            <label for="private-name">Privater Name</label>
            <input v-model="privateName" type="text" class="form-control" name="private-name" id="private-name"
                   aria-describedby="private-name-help"
                   placeholder="Felix Blume">
        </div>

        <br>

        <div class="form-group">
            <label for="economy">Economische Ansicht</label>
            <select v-model="economy" class="form-control" name="economy" id="economy">
                <template v-for="number in 21">
                    <option v-if="number !== 11">{{ number - 11 }}</option>
                </template>
            </select>
        </div>

        <br>

        <div class="form-group">
            <label for="authority">Autoritative Ansicht</label>
            <select v-model="authority" class="form-control" name="authority" id="authority">
                <template v-for="number in 21">
                    <option v-if="number !== 11">{{ number - 11 }}</option>
                </template>
            </select>
        </div>

        <br>

        <button @click="validateData" type="submit" class="btn btn-secondary">Speichern</button>

    </div>
</template>

<style scoped>

#artist-details {
    grid-area: right;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    margin-right: 2rem;
}

</style>
