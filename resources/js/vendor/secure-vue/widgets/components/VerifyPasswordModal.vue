<template>
    <component v-bind:is="'Modal'" :active="active" :loading="loading" :ok="ok" :cancel="cancel"  @confirm="handleSubmit" @abort="handleAbort">

        <template v-slot:title>
            <span>
                {{ header }}
            </span>
        </template>

        <template v-slot:body>
            <label class="form-field text">
                <input type="password" v-model="password" v-on:keyup="detectEnter" ref="input">
                <span class="form-text-prefix break-sm">{{ label }}</span>
            </label>
        </template>

    </component>
</template>

<script>

import Modal from './Modal.vue';
import VueLadda from 'vue3-ladda';
import FlashToast from "../Helper/FlashToast.js";
import emitter from 'tiny-emitter/instance.js';

export default {
    name: "VerifyPassword",

    props: {
        'route' : {
            "required": true
        },
        'ok': {
            "default": 'OK'
        },
        'cancel': {
            "default": "Cancel"
        },
        'header': {
            "required": "true"
        },
        'label': {
            "required": "true"
        }
    },

    data() {
        return {
            "active": false,
            "password": "",
            "loading": false
        }
    },

    components: {
        'Modal': Modal,
        'VueLadda': VueLadda
    },

    mounted() {
        // Add axios interceptor
        this.$http.interceptors.response.use(null, function (error) {
            if (error.config && error.response && error.response.status === 423) {
                emitter.off('password-verified');
                emitter.off('password-not-verified');
                emitter.emit('verify-password', error.config);
                return new Promise((resolve, reject) => {
                    emitter.once('password-verified', () => {
                        axios.request(error.config).then(resolve).catch(reject);
                    });
                    emitter.once('password-not-verified', () => {
                        reject();
                    });
                });
            }
            return Promise.reject(error);
        });

        emitter.on('verify-password', () => {
            this.active = true;
            this.$nextTick(() => this.setFocus());
        });
    },

    methods: {

        handleAbort() {
            this.active = false;
            emitter.emit('password-not-verified');
        },

        handleSubmit() {
            this.send();
        },

        setFocus() {
            this.$refs.input.focus();
        },

        detectEnter(e) {
            if ('Enter' === e.code) {
                this.handleSubmit();
            }
        },

        send() {
            let formData;
            if (this.password !== '') {
                this.loading = true;
                formData = new FormData();
                formData.set('password', this.password);

                this.$http.post(this.route, formData)
                    .then(this.handleResponse)
                    .catch(this.handleError)
                    .then(() => {
                        this.active = false;
                        this.password = '';
                        this.loading = false
                    });
            }
        },

        handleResponse(response) {
            if (response && response.data) {
                FlashToast.success(response.data.message, response.data.title);
                emitter.emit('password-verified');
            }
        },
        handleError(error) {
            if (error && error.response) {
                FlashToast.error(error.response.data.message, error.response.data.title);
                emitter.emit('password-not-verified');
            }
        }
    }
}
</script>

<style scoped>

</style>
