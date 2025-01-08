<template>
  <label className="form-inputgroup margin-xs-b-0 search">
    <span className="form-icon-prefix"><i className="fal fa-search"/></span>
    <input
      v-model="filterText"
      type="search"
      :placeholder="placeholder"
    >
  </label>
</template>

<script>
import debounce from 'lodash/debounce';

export default {
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    searchId: {
      type: String,
      default: null,
    },
    initialFilterText: {
      type: String,
      default: '',
    },
  },
  emits: ['search'],

  data() {
    return {
      searchTimeout: null,
      timeout: null,
      filterText: this.initialFilterText,
    };
  },

  computed: {
    hasFilterText() {
      return this.filterText.length > 0;
    },
  },

  watch: {
    filterText: debounce(function watchFilterText(newFilterText) {
      this.$emit('search', newFilterText);
    }, 500),
  },
};
</script>
