<template>
    <teleport to="#teleport-target">
        <div class="modal" v-if="active" :class="cssClass">
            <div class="modal-dialog">
                <div class="modal-content">
                    <component v-bind:is="'Header'" @abort="abort">
                        <template v-slot:title>
                            <slot name="title"></slot>
                        </template>
                    </component>
                    <component v-bind:is="'Body'">
                        <template v-slot:body>
                            <slot name="body"></slot>
                        </template>
                    </component>
                    <component v-bind:is="'Footer'" :loading="loading" :ok="ok" :cancel="cancel" @confirm="confirm" @abort="abort" :disabled="disabled" v-if="!hideFooter">
                        <template v-slot:footer>
                            <slot name="footer"></slot>
                        </template>
                    </component>
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>

import Header from './Modal/Header.vue'
import Body from './Modal/Body.vue'
import Footer from './Modal/Footer.vue'

export default {
    name: "Modal",

    emits: ['confirm', 'abort'],

    props: {
        "active":{"default":false},
        "loading":{"default":false},
        "ok":{"default":"OK"},
        "cancel":{"default":"Cancel"},
        disabled: {
            type: Boolean,
            default: false,
        },
        cssClass: {},
        hideFooter:{
          type: Boolean,
          default:false
        }
    },

    components: {
        'Header': Header,
        'Body': Body,
        'Footer': Footer,
    },
    methods: {
        confirm() {
            this.$emit('confirm');
        },
        abort() {
            this.$emit('abort');
        }
    }
}
</script>

<style scoped>

</style>
