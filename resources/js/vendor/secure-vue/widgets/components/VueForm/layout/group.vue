<template>
    <div style="display:flex; align-items: center">
        <slot></slot>
    </div>
</template>

<script>

    import baseLayout from './baseLayout';

    export default {

        extends: baseLayout,

        name: "groupLayout",
    }
</script>

<style scoped>

</style>