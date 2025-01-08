<template>
  <div>
    <label :class="['form-field', {'margin-xs-0': noMargin, 'text':isText, 'display-block':isBlock, 'radio': isRadio, 'checkbox': isCheckbox || isToggle, 'toggle': isToggle, 'error':error}]">
      <template v-if="insertBeforeLabel"> <slot></slot> </template>
      <span :class="[prefixClassName()]">
            <slot name="label"></slot>
            <i v-if="icon" :class="icon"></i>
            <i v-if="required">*</i>
        </span>
      <template v-if="!insertBeforeLabel"> <slot></slot> </template>
    </label>
    <span class="error-bubble bg-red label margin-xs-y" v-if="!isGroup && error">{{ error }}</span>
  </div>
</template>

<script>

import baseLayout from './baseLayout';

export default {

  extends: baseLayout,

  name: "prefixForm",


  // mounted() { debugger; },

  methods: {
    prefixClassName() {

      if (!this.icon) {
        return 'form-text-prefix' + (this.prefixWidth > 0 ? `-${this.prefixWidth}` : '')
      } else {
        return 'form-icon-prefix';
      }
    }
  }
}
</script>

<style scoped>

</style>
