<template>
  <table @click="onClick">
    <template v-for="(field, fieldIndex) in fields">
      <tr v-if="field.visible">
        <td v-html="field.title" />
        <template v-if="isFieldComponent(field.name)">
          <component
            :is="field.name"
            :key="fieldIndex"
            :row-data="rowData"
            :row-index="rowIndex"
            :row-field="field"
            :vuetable="vuetable()"
            :class="bodyClass('vuetable-component', field)"
            :style="{width: field.width}"
            @vuetable:field-event="onFieldEvent"
          />
        </template>
        <template v-else-if="isFieldSlot(field.name)">
          <slot
            :name="field.name"
            :row-data="item"
            :row-index="rowIndex"
            :row-field="field"
          />
        </template>
        <template v-else>
          <td v-html="renderNormalField(field)" />
        </template>
      </tr>
    </template>
  </table>
</template>

<script>

export default {
  props: {
    rowData: {
      type: Object,
      required: true,
    },
    rowIndex: {
      type: Number,
    },
    options: {
      type: Object,
      default: {},
    },
  },


  data() {
    return {
      fields: this.getFieldData(),
    };
  },

  methods: {
    onClick(e) {
      if (window.innerWidth >= 992) {
        return;
      }

      const path = e.path || e.composedPath && e.composedPath();
      const preventTags = ['a', 'button', 'input', 'select', 'textarea'];
      const wasTrigger = path && path
        .filter((el) => typeof el.tagName !== 'undefined')
        .find((el) => preventTags.indexOf(el.tagName.toLowerCase()) > -1
          || el.classList.contains('dropdown-menu'));

      if (!wasTrigger) {
        this.$parent.$parent.toggleDetailRow(this.rowData[this.$parent.trackBy]);
      }
    },

    getFieldData() {
      return this.$parent.$parent.tableFields;
    },

    renderNormalField(field) {
      return this.$parent.$parent.renderNormalField(field, this.rowData);
    },

    isFieldComponent(name) {
      return this.$parent.$parent.isFieldComponent(name);
    },

    isFieldSlot(name) {
      return this.$parent.$parent.isFieldSlot(name);
    },

    bodyClass(base, field) {
      return this.$parent.$parent.bodyClass(base, field);
    },

    onFieldEvent(type, payload) {
      this.$parent.$parent.fireEvent('field-event', type, payload, this);
    },

    vuetable() {
      return this.$parent.$parent;
    },
  },
};
</script>

<style scoped>

table {
  width: auto;
}

</style>
