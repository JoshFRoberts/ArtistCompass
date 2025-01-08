<template>
    <div :class="['row', getPadding(), getMargin(), mod]" v-bind="getAttributes">
        <slot></slot>
    </div>
</template>

<script>

    import base from '../base/base';

    export default {

        extends: base,

        name: "row",
    }
</script>

<style scoped>

</style>