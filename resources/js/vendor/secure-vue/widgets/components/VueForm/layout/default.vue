<template>
    <div>
        <label :class="['text-semibold', 'display-block']" :for="id" v-if="renderLabel">
            <slot name="label"></slot>
            <i v-if="required">*</i>
        </label>
        <slot></slot>
        <span class="error-bubble bg-red label margin-xs-y" v-if="error">{{ error }}</span>
        <div v-if="description">
            <p class="input-description" v-html="description"></p>
        </div>
    </div>
</template>

<script>

import baseLayout from './baseLayout';

export default {

    extends: baseLayout,

    name: "defaultLayout",

    props: {
        "renderLabel": {
            "type": Boolean,
            "default": true
        }
    }
}
</script>

<style scoped>

</style>
