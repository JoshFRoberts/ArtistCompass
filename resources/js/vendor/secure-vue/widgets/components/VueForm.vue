<template>
  <form @submit="e => $emit('submit', e)">
    <template
      v-for="(field, index) in fields"
      :key="index"
    >
      <component
        :is="getType(field)"
        v-if="!field.skip"
        :id="field.id"
        v-model="field.value"
        :placeholder="field.placeholder"
        :layout="field.layout"
        :description="field.description"
        :prefix-width="field.prefixWidth"
        :insert-before-label="field.insertBeforeLabel"
        :icon="field.icon"
        :attributes="field.attributes"
        :dataset="field.dataset"
        :error="field.error"
        :options="field.options"
        :name="field.name"
        :listeners="field.listeners ? field.listeners : {}"
        :required="field.required"
        :searchable="field.searchable"
        :internal-search="field.internalSearch"
        :option-label="field.optionLabel"
        :option-track-by="field.optionTrackBy"
        :reduce="field.reduce"
      >
        {{ field.label }}
        <template
          v-if="field.options && getType(field) === 'select-type'"
          #options
        >
          <template
            v-for="(option, key) in field.options"
            :key="key"
          >
            <option
              v-if="'object' === typeof option"
              :value="option.value ? option.value : option.label"
            >
              {{ option.label }}
            </option>
            <option v-else>
              {{ option }}
            </option>
          </template>
        </template>
      </component>
      <hr v-if="!field.skip">
    </template>
    <slot />
  </form>
</template>

<script>

import Str from './Helper/Str';

export default {
  name: 'VueForm',
  props: {
    fields: {
      required: false,
      default: () => [],
    },
  },
  emits: ['submit'],

  created() {},

  methods: {
    getType(field) {
      return Str.kebap(`${field.type}Type`);
    },
  },
};
</script>

<style scoped>

</style>
