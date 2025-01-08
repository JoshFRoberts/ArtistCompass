<template>
    <div :class="['box-content-2', getPadding(), getMargin(), mod]" v-bind="getAttributes">
        <slot></slot>
    </div>
</template>

<script>

    import base from '../base/base';

    export default {

        extends: base,

        name: "content2"
    }
</script>

<style scoped>

</style>