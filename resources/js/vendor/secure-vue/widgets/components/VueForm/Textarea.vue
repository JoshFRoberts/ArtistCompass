<template>
    <component v-bind:is="layout" :id="id" :no-margin="error && layout === 'prefix'" :description="description"
               :prefix-width="prefixWidth" :insert-before-label="true" :icon="icon" :error="error" :required="required">
        <template v-slot:label>
            <slot></slot>
        </template>
        <textarea :placeholder="placeholder" :id="id" v-bind="getAttributes" v-model="val"
                  :required="required" :style="style" ref="text" :name="name"></textarea>
        <template v-slot:error v-if="error">
            <span class="error-bubble bg-red label margin-xs-y">{{ error }}</span>
        </template>
    </component>
</template>

<script>

import BaseInput from './BaseInput';

export default {

    extends: BaseInput,

    name: "Textarea",

    props: {
        autoHeight: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            style_: ''
        }
    },

    mounted() {
        this.$nextTick(this.applyAutoHeight)
    },

    computed: {
        val: {
            get() {
                this.applyAutoHeight();
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        },
        style: {
            get() {
                return this.style_
            },
            set(value) {
                this.style_ = value
            }
        }
    },

    methods: {
        applyAutoHeight() {
            if (this.autoHeight && 'undefined' !== typeof this.$refs.text) {
                let borderTopWidth, borderBottomWidth, styles;
                styles = getComputedStyle(this.$refs.text);
                borderTopWidth = parseInt(styles.getPropertyValue('border-top-width'), 10);
                borderBottomWidth = parseInt(styles.getPropertyValue('border-bottom-width'), 10);
                this.style = 'height: auto';
                this.$nextTick(() => {
                    this.style = `height: ${this.$refs.text.scrollHeight + borderTopWidth + borderBottomWidth}px`
                })
            }
        }
    }
}
</script>

<style scoped>

</style>
