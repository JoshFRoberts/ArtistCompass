<template>
  <checkbox-type
    type="toggle"
    :options="getOptions()"
    layout="empty"
    :checked="filterValue"
    @change="update"
  />
</template>

<script>
export default {
  name: 'SpVuetableFilterBoolean',

  props: {
    filterKey: {
      type: String,
    },
    filterValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
    },
  },
  emits: ['filter-changed'],
  data() {
    return {
      value: this.filterValue,
    };
  },
  methods: {
    update(e) {
      this.value = e.target.checked;
      this.$emit('filter-changed', this.value);
    },
    getOptions() {
      const options = {};
      options[this.label] = 1;
      return options;
    },
  },
};
</script>

<style scoped>

</style>
