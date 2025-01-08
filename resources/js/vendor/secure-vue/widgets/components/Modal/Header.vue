<template>
    <div class="modal-header">
        <h4 class="modal-title float-xs-left">
            <slot name="title">Please provide a title</slot>
        </h4>
        <button v-if="!hideHeaderButtons" v-on:click.prevent="abort" type="button" class="close"><span>×</span></button>
    </div>
</template>

<script>
    export default {
        name: "HeaderLocalEvents",

        emits: ['abort'],

        props: {
            hideHeaderButtons: {
                type: Boolean,
                default: false
            },
        },

        methods: {

            abort() {
                if (!this.hideButtons) {
                    this.$emit('abort');
                }
            }
        }
    }
</script>

<style scoped lang="scss">

.modal .modal-dialog .modal-header {
  background: #333;
}

.modal .modal-dialog .modal-header .modal-title {
  color: #fff;
}

.modal .modal-dialog .modal-header button {
  color: rgba(255,255,255,0.5);
}

</style>
