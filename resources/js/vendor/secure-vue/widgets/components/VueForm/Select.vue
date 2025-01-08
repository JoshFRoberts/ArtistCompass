<template>
  <component
    :is="layout"
    :id="id"
    :no-margin="error && layout === 'prefix'"
    :description="description"
    :prefix-width="prefixWidth"
    :is-text="true"
    :insert-before-label="false"
    :icon="icon"
    :error="error"
    :required="required"
  >
    <template #label>
      <slot />
    </template>
    <VueMultiselect
      :id="id"
      ref="multiSelect"
      v-bind="getAttributes"
      v-model="internalValue"
      :options="internalOptions"
      :required="required"
      :track-by="getTrackBy"
      :label="getLabel"
      :searchable="searchable"
      :internal-search="internalSearch"
      :clear-on-select="false"
      :multiple="multiple"
      :loading="loading"
      :custom-label="customLabel"
      :placeholder="placeholder"
      @search-change="$emit('search-change', $event)"
      @input="$emit('input', $event)"
      @select="$emit('select', $event)"
      @remove="$emit('remove', $event)"
      @tag="$emit('tag', $event)"
      @open="$emit('open', $event)"
      @close="$emit('close', $event)"
    >
      <template
        v-for="(_, name) in $slots"
        #[name]="slotData"
      >
        <slot
          :name="name"
          v-bind="slotData"
        />
      </template>
    </VueMultiselect>
    <select
      data-type="vue-select"
      style="display: none"
      :name="`${name ? multiple ? `${name}[]` : `${name}` : ''}`"
      :multiple="multiple"
    >
      <template
        v-for="(option, key) in internalOptions"
        :key="key"
      >
        <option
          :value="'object' === typeof option ? option[getTrackBy] ? option[getTrackBy] : option.value : option"
          :selected="isOptionSelected(option)"
        >
          {{ customLabel(option) }}
        </option>
      </template>
    </select>
    <template
      v-if="error || validationMsg"
      #error
    >
      <span class="error-bubble bg-red label margin-xs-y">
        {{ error || validationMsg }}
      </span>
    </template>
  </component>
</template>

<script>

import VueMultiselect from 'vue-multiselect';
import BaseInput from './BaseInput';

function isEmpty(opt) {
  if (opt === 0) return false;
  if (Array.isArray(opt) && opt.length === 0) return true;
  return !opt;
}

export default {
  name: 'VueFormSelect',
  components: {
    VueMultiselect,
  },
  extends: BaseInput,
  props: {
    options: {},
    optionTrackBy: {
      default: 'value',
    },
    optionLabel: {
      default: 'label',
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    internalSearch: {
      type: Boolean,
      default: false,
    },
    reduce: {
      type: Function,
      default: (option) => option,
    },
    loading: {},
    customLabel: {
      type: Function,
      default(option, label) {
        if (isEmpty(option)) return '';
        return label ? option[label] : option;
      },
    },
    resetOnOptionsChange: {
      default: false,
      validator: (value) => ['function', 'boolean'].includes(typeof value),
    },
  },
  emits: [
    'input', 'select', 'remove', 'search-change', 'tag',
    'open', 'close', 'invalid', 'update:modelValue', 'after-select',
  ],
  data() {
    return {
      validationMsg: '',
      _value: [],
    };
  },
  computed: {
    internalOptions() {
      if (this.optionsIsObject()) {
        const options = [];
        Object.entries(this.options).forEach(([key, value]) => {
          options.push({
            value: key,
            label: value,
          });
        });
        return options;
      }

      return this.options;
    },
    internalValue: {
      get() {
        let { modelValue } = this;
        if (this.isTrackingValues) {
          modelValue = this._value;
        }
        if (modelValue) {
          return [].concat(modelValue);
        }
        return [];
      },
      set(value) {
        this._value = value;
        this.updateModelValue(value);
      },
    },
    isTrackingValues() {
      const fn = (option) => option;
      return (
        typeof this.modelValue === 'undefined'
        || this.$props.reduce.toString() !== fn.toString()
      );
    },
    multiple() {
      return Object.values(this.attributes).includes('multiple');
    },
    getTrackBy() {
      if ((this.optionsHasObject() && this.isTrackingValues) || this.optionTrackBy !== 'value') {
        return this.optionTrackBy;
      }

      return null;
    },
    getLabel() {
      if (this.optionsHasObject() || this.optionLabel !== 'label') {
        return this.optionLabel;
      }

      return null;
    },
  },
  watch: {
    options(newOptions, oldOptions) {
      const shouldReset = () => (typeof this.resetOnOptionsChange === 'function'
        ? this.resetOnOptionsChange(
          newOptions,
          oldOptions,
          this._value,
        )
        : this.resetOnOptionsChange);
      if (shouldReset()) {
        this.updateModelValue(this.multiple ? [] : null)
      }
      if (this.modelValue && this.isTrackingValues) {
        this.setInternalValueFromOptions(this.modelValue);
      }
    },
    modelValue(val) {
      if (this.isTrackingValues) {
        this.setInternalValueFromOptions(val)
      }
    },
  },
  created() {
    if (typeof this.modelValue !== 'undefined' && this.isTrackingValues) {
      this.setInternalValueFromOptions(this.modelValue);
    }
  },
  methods: {
    setInternalValueFromOptions(value) {
      if (Array.isArray(value)) {
        this._value = value.map((val) => this.findOptionFromReducedValue(val));
      } else {
        this._value = this.findOptionFromReducedValue(value);
      }
    },
    findOptionFromReducedValue(value) {
      const predicate = (option) => JSON.stringify(this.reduce(option)) === JSON.stringify(value);
      const matches = this.internalOptions.filter(predicate);
      if (matches.length === 1) {
        return matches[0];
      }

      return value;
    },
    updateModelValue(value) {
      if (typeof this.value === 'undefined') {
        // Vue select has to manage value
        this._value = value;
      }
      if (value !== null) {
        if (Array.isArray(value)) {
          value = value.map((val) => this.reduce(val));
        } else {
          value = this.reduce(value);
        }
      }

      this.$emit('update:modelValue', value);
    },
    isOptionSelected(option) {
      return this.internalValue.some((value) => this.optionComparator(value, option));
    },
    optionComparator(a, b) {
      const key1 = typeof a === 'object' ? a[this.getTrackBy] ? a[this.getTrackBy] : a.value : a;
      const key2 = typeof b === 'object' ? b[this.getTrackBy] ? b[this.getTrackBy] : b.value : b;
      return key1 === key2;
    },
    optionsHasObject() {
      return this.internalOptions
        && Array.isArray(this.internalOptions)
        && this.internalOptions.some((el) => typeof el === 'object');
    },
    optionsIsObject() {
      return this.options
        && !Array.isArray(this.options)
        && typeof this.options === 'object';
    },
  },
};
</script>
