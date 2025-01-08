<template>
  <row :padding="[padding]">
    <column :lg="12">
      <prefix :insert-before-label="insertBeforeLabel" :is-text="isText" :isGroup="isGroup" :prefix-width="prefixWidth" :no-margin="true" :icon="icon" :error="error" :is-radio="isRadio" :is-block="isBlock" :is-checkbox="isCheckbox" :is-toggle="isToggle" :required="required">
        <template v-slot:label><slot name="label"></slot></template>
        <slot></slot>
      </prefix>
    </column>
    <column :lg="12" v-if="description">
      <p class="input-description" v-html="description"></p>
    </column>
  </row>
</template>

<script>

import baseLayout from './baseLayout.js';
import prefix from './prefix.vue'

export default {

  extends: baseLayout,

  name: "prefixForm",

  data() {
    return {
      "padding": this.firstOfGroup ? 'xs-y' : 'xs-b'
    }
  },

  // mounted() {debugger;},

  components: {
    "prefix": prefix
  }
}
</script>

<style scoped>

</style>
