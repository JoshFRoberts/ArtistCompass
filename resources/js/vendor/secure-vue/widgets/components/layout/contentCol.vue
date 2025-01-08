<template>
    <column :mod="mod" :attributes="attributes" :dataset="dataset" :margin="margin" :padding="padding" :xs="xs" :sm="sm" :md="md" :lg="lg" :xl="xl">
        <content-box :mod="boxMod" :dataset="boxDataset" :attributes="boxAttributes"
                     :border="border" :clickable="clickable" :shadow="shadow"
                     :icon="icon" :icon-bg="iconBg" :icon-circle="iconCircle"
                     :align-icon="alignIcon" :align-icon-box="alignIconBox"
                     :close="close"
                     @close="$emit('close')"
        >
            <slot></slot>
        </content-box>
    </column>
</template>

<script>

    import base from "../base/base.js";
    import column from "./column.vue";
    import contentBox from "./contentBox.vue";

    export default {

        extends: base,

        name: "contentCol",

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
            "border": {"type": Boolean, "default": false},
            "shadow": {"type": Boolean, "default": false},
            "clickable": {"type": Boolean, "default": false},
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
                "default": "primary"
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
            "column": column,
            "contentBox": contentBox,
        }
    }
</script>

<style scoped>

</style>
