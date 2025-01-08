<template>
    <row :mod="mod" :attributes="attributes" :dataset="dataset" :margin="margin" :padding="padding">
        <contentCol :mod="colMod" :dataset="colDataset" :attributes="colAttributes"
                    :boxMod="boxMod" :boxDataset="boxDataset" :boxAttributes="boxAttributes"
                    :border="border" :clickable="clickable" :shadow="shadow"
                    :icon="icon" :icon-bg="iconBg" :icon-circle="iconCircle"
                    :align-icon="alignIcon" :align-icon-box="alignIconBox"
                    :close="close"
                    @close="$emit('close')"
        >
            <slot></slot>
        </contentCol>
    </row>
</template>

<script>

    import base from '../base/base.js';
    import row from './row.vue';
    import contentCol from './contentCol.vue';

    export default {

        extends: base,

        name: "contentRow",

        props: {
            "border": {"type": Boolean, "default": false},
            "shadow": {"type": Boolean, "default": false},
            "clickable": {"type": Boolean, "default": false},
            "colMod": {"type":String,"default":""},
            "colDataset": {
                "default": () => { return {} }
            },
            "colAttributes": {
                "default": () => { return {} }
            },
            "boxMod": {"type":String,"default":""},
            "boxDataset": {
                "default": () => { return {} }
            },
            "boxAttributes": {
                "default": () => { return {} }
            },
            "icon": {
                "type": [String, Boolean],
                "default": false
            },
            "iconBg": {
                "type": String,
                "default": ""
            },
            "iconCircle": {
                "type": Boolean,
                "default": false
            },
            "alignIcon": {
                "type": String,
                "default": ""
            },
            "alignIconBox": {
                "type": String,
                "default": ""
            },
            "close": {
                "type": Boolean,
                "default": false
            }
        },

        components: {
            "row": row,
            "contentCol": contentCol,
        }
    }
</script>

<style scoped>

</style>
