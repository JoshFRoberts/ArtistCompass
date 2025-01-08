<template>
    <div :class="[getColClassList(), getPadding(), getMargin()]" v-bind="getAttributes">
        <slot></slot>
    </div>
</template>

<script>

    import base from '../base/base';

    export default {

        extends: base,

        name: "column",

        props: {
            "xs": {
                "type": [Number, Boolean],
                "required": false,
                "default": false,
            },
            "sm": {
                "type": [Number, Boolean],
                "required": false,
                "default": false,
            },
            "md": {
                "type": [Number, Boolean],
                "required": false,
                "default": false,
            },
            "lg": {
                "type": [Number, Boolean],
                "required": false,
                "default": false,
            },
            "xl": {
                "type": [Number, Boolean],
                "required": false,
                "default": false,
            },
        },

        methods: {
            getColClassList() {

                let bp = {'xs':this.xs, 'sm':this.sm, 'md':this.md, 'lg':this.lg, 'xl':this.xl};

                return Object.keys(bp)
                    .filter(t => { return false !== bp[t] })
                    .map(t => { return `col-${t}` + (bp[t] !== null ? `-${bp[t]}` : '') })
                    .join(' ');
            }
        }
    }
</script>

<style scoped>

</style>