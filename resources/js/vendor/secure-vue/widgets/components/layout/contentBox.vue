<template>
    <div :class="wrapperClassList()">
        <div class="box-body">
            <div v-if="icon" :class="iconBoxClassList()">
                <div :class="iconClassList()">
                    <i :class="icon"></i>
                </div>
            </div>
            <div :class="`box-content-2 ${mod}`">
                <ul v-if="close" class="box-menu">
                    <li>
                        <a class="hover-bg-red" @click="$emit('close')">
                            <i class="fal fa-fw fa-times"></i>
                        </a>
                    </li>
                </ul>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>

    import base from "../base/base";

    export default {

        extends: base,

        name: "contentBox",

        props: {
            "border": {"type": Boolean, "default": false},
            "shadow": {"type": Boolean, "default": false},
            "clickable": {"type": Boolean, "default": false},
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

        methods: {
            wrapperClassList() {

                let classList = [];

                this.border || this.shadow || classList.push('box');
                this.border && classList.push('box-border');
                this.shadow && classList.push('box-shadow');
                this.clickable && classList.push('clickable');

                return classList.join(' ');
            },

            iconBoxClassList() {

                let classList = ['box-icon', 'icon-center'];

                this.iconCircle || classList.push(`bg-${this.iconBg}`);
                this.alignIcon && classList.splice(classList.indexOf('icon-center'), 1, `icon-${this.alignIcon}`);
                this.alignIconBox && classList.splice(classList.indexOf('box-icon'), 1, `box-icon-${this.alignIconBox}`);

                return classList.join(' ');
            },

            iconClassList() {

                let classList = ['icon'];

                this.iconCircle && classList.splice(classList.indexOf('icon'), 1, 'icon-circle') && classList.push(`bg-${this.iconBg}`);

                return classList.join(' ');
            }
        }
    }
</script>

<style scoped>

</style>