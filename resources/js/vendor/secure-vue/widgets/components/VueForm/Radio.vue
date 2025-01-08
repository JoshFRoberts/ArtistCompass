<template>
    <component v-bind:is="layout"
               :id="id"
               :icon="icon"
               :error="error"
               :is-radio="true"
               :is-block="true"
               :is-text="false"
               :render-label="!isGroup"
               :description="description"
               :prefix-width="prefixWidth"
               :insert-before-label="false"
               :first-of-group="firstOfGroup"
               :required="required"
               :isGroup="isGroup"
               :no-margin="error && layout === 'prefix'"
    >
        <template v-slot:label><slot></slot></template>

        <template v-for="(option, key) in options_" :key="key">
            <label :class="['form-field', 'radio']">
                <input type="radio" :name="name"
                       :required="required && key.toString() === Object.keys(options_)[0].toString()"
                       @invalid.prevent="required && key.toString() === Object.keys(options_)[0].toString() && $emit('invalid', $event)"
                       @change="required && $emit('invalid', $event)"
                       :value="option.value"
                       v-model="val"
                       :isGroup="isGroup"
                       v-bind="getAttributes"
                >
                <span></span>
                <template v-if="layout !== 'prefixForm'">
                    {{ option.label }}
                </template>
            </label>
        </template>
    </component>
</template>

<script>

import BaseInput from './BaseInput.js';
import GroupLayout from './layout/group.vue';

export default {
    name: "Radio",

    extends: BaseInput,

    emits: ['invalid'],

    components: {
        "groupLayout": GroupLayout
    },

    props: {
        "options": {
            "type": [Object, Array],
        },
        "firstOfGroup":{
            "type": Boolean,
            "default": false
        },
        "isGroup":{
            "type": Boolean,
            "default": false
        },
    },

    data() {
        return {
            "checked_": 'undefined' !== typeof this.value ? this.value : this.checked
        }
    },

    computed: {
        val: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        },
        "options_": {
            get() {
                if (this.options instanceof Array) {
                    return this.options
                }

                return Object.keys(this.options).map((k) => {
                    return {
                        value: this.options[k],
                        label: k
                    }
                });
            }
        }
    },
}
</script>

<style scoped>

</style>
