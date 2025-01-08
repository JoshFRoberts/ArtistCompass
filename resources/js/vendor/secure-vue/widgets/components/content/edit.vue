<template>
    <div>
        <h4>
            <span>{{ header }}</span>
            <span class="buttons">
                <span :title="saveTitle" @click="save"><i :class="saveIcon"></i></span>
                <span :title="toggleTitle" @click="toggle"><i :class="toggleIcon"></i></span>
            </span>
        </h4>
        <hr class="margin-xs-y">
        <slot></slot>
    </div>
</template>

<script>

    import base from '../base/base';

    export default {
        extends: base,

        name: "contentEdit",

        props: {
            "header": {
                "type": String,
                "default": "Plz add a title"
            },
            "saveIcon": {
                "type": String,
                "default": "far fa-save"
            },
            "saveTitle": {
                "type": String,
                "default": "Plz add a title"
            },
            "toggleIcon": {
                "type": String,
                "default": "far fa-cog"
            },
            "toggleTitle": {
                "type": String,
                "default": "Plz add a title"
            },
            "fields": {
                "type": Array,
                "default": () => {return []}
            },
            "url": {
                "type": String,
                "required": true
            },
            "method": {
                "type": String,
                "default": "post"
            }
        },

        data() {

            let data = {};

            this.fields.forEach((field) => {
                data[field] = null;
            });

            data.isActive = false;

            return data
        },

        mounted() {

            this.fields.forEach((field) => {
                this[field] = this.$root.$refs[field].savedValue;
                this.$root.$refs[field].$on('update', (text) => {
                    this[field] = text;
                })
            });
        },

        methods: {

            save() {
                let data = {};

                if (this.isActive) {

                    this.toggle(false);
                    this.fields.forEach(field => {
                        data[field] = this[field];
                    });

                    this.$http[this.method](this.url, data)
                        .then(function (response) {
                            this.notify('success', response.data);
                            this.fields.forEach((field) => {this.$root.$refs[field].storeSavedValue()});
                        }.bind(this))
                        .catch(function (error) {
                            this.notify('error', error.response.data)
                        }.bind(this));
                }
            },

            /**
             * @param {Boolean} [force]
             */
            toggle(force) {
                force instanceof MouseEvent && force.preventDefault();
                this.isActive = "boolean" === typeof force ? force : !this.isActive;

                if ('boolean' !== typeof force && !this.isActive) {
                    this.fields.forEach(field => this.$root.$refs[field].reset());
                }

                this.fields.forEach(field => this.$set(this.$root.$refs[field], 'active', this.isActive));
                setTimeout(() => {
                    let p = this.$root.$refs[this.fields[0]].$el,
                        s = window.getSelection(),
                        r = document.createRange();

                    // https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse
                    r.selectNodeContents(p);
                    r.collapse(false);
                    s.removeAllRanges();
                    s.addRange(r)
                }, 0);

            },

            /**
             * @param {String} level
             * @param {{header:String,message:String}} data
             */
            notify(level, data) {
                this.$root.$emit('toast', {'level': level, 'title': data.header, 'message': data.message})
            }
        }
    }
</script>

<style scoped lang="scss">
    h4 {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .buttons span {
        cursor: pointer;
        user-select: none;
    }
</style>