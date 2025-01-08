<template>
  <radio-group-type
    :options="options"
    layout="empty"
    :value="value"
    :name="name"
    @change="update"
  >
    {{ label }}
  </radio-group-type>
</template>

<script>

export default {
  name: 'RadioButtons',

  props: {
    filterKey: {
      type: String,
    },
    filterValue: {
      type: String,
      default: 'mit',
    },
    label: {
      type: String,
    },
    options: {
      type: Object,
      default: () => ({
        Alle: 'all',
        Mit: 'mit',
        Ohne: 'ohne',
      }),
    },
    name: {
      type: String,
      default: '',
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
      this.value = e.target.value;
      this.$emit('filter-changed', this.value);
    },
  },
};
</script>

<style scoped>

</style>
