<template>
    <component v-bind:is="layout" :id="id"
               :description="description"
               :prefix-width="prefixWidth"
               :is-text="false"
               :insert-before-label="false"
               :no-margin="error && layout === 'prefix'"
               :icon="icon" :error="error" :is-toggle="type === 'toggle'" :is-checkbox="true" :is-block="true" :first-of-group="firstOfGroup" :required="required">
        <template v-slot:label><slot></slot></template>

        <template v-for="option in options_">
            <label :class="['form-field', 'checkbox', {'toggle':type==='toggle'}]">
                <input type="checkbox" v-bind="getAttributes" :name="name" :value="option.value"
                       v-model="val" :required="required">
                <span></span>
                <template v-if="layout !== 'prefixForm'">
                    <span v-html="option.label" />
                </template>
            </label>
        </template>

        <template v-slot:error v-if="error">
            <span class="error-bubble bg-red label margin-xs-y">{{ error }}</span>
        </template>
    </component>
</template>

<script>

import BaseInput from './BaseInput';
import GroupLayout from './layout/group.vue';

export default {
    name: "Checkbox",

    extends: BaseInput,

    components: {
        "groupLayout": GroupLayout
    },

    props: {
        "label": {
            "type": String,
        },
        "type": {
            "type": String,
            "default": "checkbox"
        },
        "firstOfGroup":{
            "type": Boolean,
            "default": true
        },
        "isGroup":{
            "type": Boolean,
            "default": false
        },
        "options": {
            "type": [Object, Array]
        },
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
