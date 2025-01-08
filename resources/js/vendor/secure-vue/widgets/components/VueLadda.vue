<template>
    <button
        ref="ladda"
        :class="buttonClass"
        :data-style="dataStyle"
        @click="handleClick"
    >
        <slot><span class="ladda-label">Submit</span></slot>
    </button>
</template>

<script>
import * as Ladda from 'ladda/js/ladda';

export default {
    name: 'VueLadda',
    emits: ['click'],
    props: {
        // customizable button's class attribute - you can use your own CSS class
        buttonClass: {
            type: String,
            default: 'ladda-button',
        },
        // use vue props validation to make sure "data-style" is given. (ladda need it)
        dataStyle: {
            type: String,
            default: 'expand-left',
        },
        // loading prop to change the status of this component.
        loading: {
            type: Boolean,
            required: true,
        },
        progress: {
            validator(progress) {
                return progress >= 0 && progress <= 1;
            },
            default: 0,
        },
    },
    watch: {
        loading(loading) {
            loading ? this.ladda.start() : this.ladda.stop();
        },
        progress(progress) {
            this.ladda.setProgress(progress);
        },
    },
    mounted() {
        this.ladda = Ladda.create(this.$refs.ladda);
        this.loading ? this.ladda.start() : this.ladda.stop();
    },
    beforeUnmount() {
        this.ladda.remove();
        delete this.ladda;
    },
    methods: {
        handleClick(e) {
            this.$emit('click', e);
        },
    },
};
</script>
