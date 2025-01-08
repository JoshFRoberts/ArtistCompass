<template>
    <div class="radiogroup">
        <row v-if="layout==='prefixForm'" padding="xs-t">
            <column :xs="24">
                <p class="text-semibold"><slot></slot></p>
            </column>
        </row>

        <component v-if="layout !== 'prefixForm'" v-bind:is="layout" :id="id" :description="description" :prefix-width="prefixWidth" :is-text="layout === 'prefix'" :is-radio="true" :insert-before-label="false" :icon="icon" :error="error" :required="required">
            <template slot="label"><slot></slot></template>
            <component :attributes="attributes" v-bind:is="type_" :options="options" :layout="layout === 'prefix' ? 'groupLayout' : 'default'" :value="value"
                       v-model="val" :is-group="true" :required="required"></component>
        </component>

        <template v-else>
            <component v-for="(value, key) in options" v-bind:is="type_"
                       :description="key === Object.keys(options)[0] ? description : ''"
                       :first-of-group="key === Object.keys(options)[0]"
                       :key="value"
                       :options='JSON.parse(`{"${key}":"${value}"}`)'
                       layout="prefixForm"
                       :name="name"
                       :prefix-width="prefixWidth"
                       :is-group="true"
                       v-model="val"
                       type="checkbox"
                       :required="required"
                       :value="value"
                       :attributes="attributes"
            >{{ key }}</component>
        </template>

        <template slot="error" v-if="error">
            <span class="error-bubble bg-red label margin-xs-y">{{ error }}</span>
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
            "type_": this.type === 'toggle-group' ? 'toggle-type' : 'checkbox-type',
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
