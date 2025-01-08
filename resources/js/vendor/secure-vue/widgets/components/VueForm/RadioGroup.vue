<template>
    <div v-bind:class="{'radiogroup': true, 'error': error }">
        <row v-if="layout==='prefixForm'" padding="xs-t">
            <column :xs="24">
                <p class="text-semibold"><slot></slot></p>
            </column>
        </row>

        <component v-if="layout !== 'prefixForm'" v-bind:is="layout" :id="id" :description="description" :prefix-width="prefixWidth" :is-text="layout === 'prefix'" :is-radio="true" :insert-before-label="false" :icon="icon" :error="error" :required="required">
            <template v-slot:label><slot></slot></template>
            <component v-bind:is="'radio-type'" :attributes="attributes" :listeners="listeners" @invalid="validationMsg = $event.currentTarget.validationMessage" :name="name" :options="options" :layout="layout === 'prefix' ? 'groupLayout' : 'default'" :value="value"
                       v-model="val" :is-group="true" :required="required"></component>
            <template v-slot:error v-if="error || validationMsg">
                <span class="error-bubble bg-red label margin-xs-y">{{ error || validationMsg }}</span>
            </template>
        </component>

        <template v-else>
            <component v-for="(v, key) in options" v-bind:is="'radio-type'"
                       :description="key === Object.keys(options)[0] ? description : ''"
                       :first-of-group="key === Object.keys(options)[0]"
                       :key="v"
                       :options='JSON.parse(`{"${key}":"${v}"}`)'
                       layout="prefixForm"
                       :name="name"
                       :prefix-width="prefixWidth"
                       :is-group="true"
                       v-model="val"
                       :required="required && key.toString() === Object.keys(options_)[0].toString()"
                       :value="value"
                       :attributes="attributes"
            >{{ key }}</component>
            <span class="error-bubble bg-red label margin-xs-y" v-if="error || validationMsg">{{ error || validationMsg }}</span>
        </template>
    </div>
</template>

<script>


import BaseInput from './BaseInput';

export default {
    name: "RadioGroup",

    extends: BaseInput,

    props: {
        "options": {
            "type": [Object, Array],
            "default": () => {return {}},
        },
    },

    data() {

        return {
            "first": true,
            validationMsg: '',
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
