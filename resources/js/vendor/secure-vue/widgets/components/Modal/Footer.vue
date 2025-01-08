<template>
  <div class="modal-footer content-2">
    <button type="button" class="btn abortButton pull-left" @click.prevent="abort" v-if="cancel !== ''"><i class="fal fa-fw fa-times"></i> {{ cancel }}</button>
    <component v-bind:is="'VueLadda'" title="OK" :disabled="disabled" class="btn okButton margin-md-0 float-xs-right" v-on:click.prevent="confirm" :loading="loading">
            <span>
                <i class="fal fa-fw fa-check"></i>
                {{ ok }}
            </span>
    </component>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import VueLadda from 'vue3-ladda';

export default {
  name: "Footer",

  emits: ['confirm', 'abort'],

  props: {
    'loading': {
      type: Boolean,
      default: false
    },
    'ok': {
      type: String,
      default: 'OK'
    },
    'cancel': {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },

  components: {
    "VueLadda":VueLadda
  },

  methods: {
    confirm() {
      this.$emit('confirm');
    },
    abort() {
      this.$emit('abort');
    }
  },
}
</script>
