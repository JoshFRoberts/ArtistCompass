<template>
    <component v-bind:is="layout" :no-margin="error && layout === 'prefix'" :id="id" :isGroup="isGroup" :description="description" :prefix-width="prefixWidth" :insert-before-label="insertBeforeLabel" :icon="icon" :error="error" :required="required">
        <template v-slot:label><slot></slot></template>
        <input :type="type"
               :placeholder="placeholder"
               :id="id"
               v-bind="getAttributes"
               :value="modelValue"
               @input="$emit('update:modelValue', $event.target.value)"
               :required="required"
               :name="name">
        <template v-slot:error v-if="error">
            <span class="error-bubble bg-red label margin-xs-y">{{ error }}</span>
        </template>
    </component>
</template>

<script>

import BaseInput from './BaseInput';

const validTypes = [
    "button","color","date","datetime-local","email", "file",
    "image", "hidden", "month", "number", "password", "range",
    "reset", "submit", "tel", "text", "url", "week"
];

export default {

    extends: BaseInput,

    name: "Input",
}
</script>

<style scoped>

</style>
