<template>
    <span :class="getClasses()" :contenteditable="active && !hasOptions()" :data-selectable="selectActive()" @input="update" @click="toggleDropdown">
        <span v-if="selectActive()" class="selection">
            <span class="select2-selection select2-selection--single">
                <span class="select2-selection__rendered">
                    <slot></slot>
                </span>
                <span class="select2-selection__arrow" role="presentation">
                    <b role="presentation"></b>
                </span>
            </span>
        </span>
        <slot v-else></slot>
    </span>
</template>

<script>

    import base from '../base/base';

    export default {
        extends: base,

        name: "contentEditable",

        props: {
            "options": {
                "type": Object,
                "default": () => {return {}}
            }
        },

        data() {
            return {
                "active": false,
                "isOpen": false,
                "dropdown": false,
                "savedValue": null
            }
        },

        mounted() {
            this.dropdownClose = this.closeDropdown.bind(this);
            this.storeSavedValue();
        },

        methods: {
            update(e) {

                this.$slots.default[0].text = e.target.innerText;
                this.$emit('update', this.hasOptions() ?  e.target.dataset.value : e.target.innerText);
            },

            storeSavedValue() {
                let value = this.$slots.default[0].text;
                this.savedValue = this.hasOptions()
                    ? Object.keys(this.options)[Object.values(this.options).indexOf(value)]
                    : value;
            },

            reset() {

                let fakeEvent = {
                    target:{
                        innerText: this.savedValue,
                        dataset:{
                            value: null
                        }
                    }
                };
                if (this.hasOptions()) {
                    fakeEvent.target.dataset.value = this.savedValue;
                    fakeEvent.target.innerText = this.options[this.savedValue];
                } else {
                    this.$el.innerText = fakeEvent.target.innerText;
                }
                this.update(fakeEvent);
            },

            toggleDropdown(e) {
                if (this.hasOptions() && !this.isOpen) {
                    e.stopPropagation();
                    this.createDropdown();
                }
            },

            selectActive() {
                return this.active && this.hasOptions()
            },

            hasOptions() {
                return Object.keys(this.options).length > 0;
            },

            createDropdown() {
                let rect = this.$el.getBoundingClientRect();
                this.dropdown = document.createElement('span');
                this.dropdown.classList.add('content-editable-options-dropdown');
                this.dropdown.classList.add('select2-dropdown');
                this.dropdown.style.top = `${rect.top + rect.height}px`;
                this.dropdown.style.left = `${rect.left}px`;
                this.dropdown.style.width = `${rect.width}px`;
                this.dropdown.style.zIndex = this.getZIndex();

                Object.keys(this.options).forEach(key => {
                    let o = document.createElement('span');
                    o.dataset.value = key;
                    o.innerText = this.options[key];
                    o.classList.add('select2-results__option');
                    this.dropdown.appendChild(o);
                });

                document.body.appendChild(this.dropdown);
                document.addEventListener('click', this.dropdownClose);
                this.isOpen = true;
            },

            closeDropdown(e) {

                if (e.target.parentElement === this.dropdown) {
                    this.update(e);
                }
                document.removeEventListener('click', this.dropdownClose);
                document.body.removeChild(this.dropdown);
                this.dropdown = false;
                this.isOpen = false;
            },

            getZIndex() {
                let result = 0;
                document.body.childNodes.forEach(n => {
                    let s, z;

                    if (n instanceof HTMLElement) {
                        s = getComputedStyle(n);
                        z=s.getPropertyValue('z-index');

                        if (z && !isNaN(z)) {
                            result = Math.max(result, z) + 1;
                        }
                    }
                });
                return result;
            },
            getClasses() {
                return [
                    'editable--root',
                    {
                        'select2-container':this.selectActive(),
                        'select2-container--default':this.selectActive(),
                        'select2-container--below':this.selectActive(),
                        'select2-container--open':this.selectActive() && this.isOpen
                    }
                    ]
            }
        }
    }
</script>

<style scoped lang="scss">

    @import '@sp/sp-sass/sass/settings';
    @import '@sp/sp-sass/sass/forms';

    span.editable--root {

        &[contenteditable="true"],
        &[data-selectable="true"] {
            @extend %defaultInput;
            &[disabled] {
                @extend %disabledInput;
            }
        }

        &.select2-container {
            padding: 0;
            border: none;
            box-shadow: none;
        }
    }

</style>

<style lang="scss">
    @import '@sp/sp-sass/sass/settings';
    .content-editable-options-dropdown {
        span {
            display: block;

            &:hover {
                background: $primaryColor;
            }
        }
    }
</style>
