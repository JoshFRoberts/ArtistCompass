<template>
  <div class="filter-wrapper">
    <div
      v-if="hasFiltersSlot || searchEnabled || hasButtonsSlot"
      class="row toolbar"
    >
      <div class="col-xs-24 padding-xs-b">
        <div class="box-border bg-white padding-xs-x">
          <div class="row flexrow flex-wrap padding-xs">
            <div
              v-if="searchEnabled"
              class="col-xs col-md padding-xs-r"
            >
              <search-bar
                :placeholder="$t('common.search')"
                :initial-filter-text="filterText"
                :search-id="searchId"
                @search="filterText = $event"
              />
            </div>
            <div
              v-if="hasButtonsSlot"
              class="col-xs flex-shrink"
            >
              <div class="btn-toolbar btn-toolbar">
                <div class="btn-group">
                  <slot name="buttons" />
                </div>
              </div>
            </div>
            <div
              v-if="hasFiltersSlot"
              class="col-xs flex-shrink"
            >
              <div class="btn-toolbar btn-toolbar">
                <div class="btn-group">
                  <button
                    class="btn margin-btn-b-0 action-slideToggle"
                    data-target="vuetable-filter"
                    data-class="hidden"
                    :title="$t('common.filter-table')"
                  >
                    <i class="fal fa-filter" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="hasFiltersSlot"
      class="row"
    >
      <div
        class="filter col-lg-12 col-xl-8 offset-lg-12 offset-xl-16 padding-xs hidden"
        data-name="vuetable-filter"
      >
        <div class="box-shadow">
          <div class="box-body">
            <div class="box-content-2">
              <div class="row">
                <div class="col-xs-24 padding-xs-b">
                  <i class="fal fa-fw fa-filter" /> <span class="text-bold">Filter:</span>
                </div>
                <hr>
                <slot name="filters" />
                <hr>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-24 col-xl-24 col-xs-24 padding-xs">
        <div class="box-shadow">
          <div class="box-body">
            <div class="box-content-2">
              <sp-vuetable
                ref="vuetable"
                :api-url="apiUrl"
                :api-mode="apiMode"
                :load-on-start="loadOnStart"
                :data="data"
                :fields="fields"
                :sort-order="sortOrder"
                :track-by="trackBy"
                :custom-params="customParams"
                :search-id="searchId"
                :initial-page="initialPage"
                :per-page="perPage"
                :has-filter="true"
                :filter-text="filterText"
                :detail-row="detailRow"
                :detail-row-options="detailRowOptions"
                :row-class="rowClass"
                @vuetable:loading="loading = true;"
                @vuetable:loaded="loading = false;"
                @vuetable:cell-clicked="$emit('vuetable:cell-clicked', $event)"
                @vuetable:field-event="$emit('vuetable:field-event', $event)"
                @vuetable:load-error="$emit('vuetable:load-error', $event)"
                @vuetable:load-success="$emit('vuetable:load-success', $event)"
                @vuetable:checkbox-toggled="$emit('vuetable:checkbox-toggled', $event)"
              >
                <template
                  v-if="hasBeforeTableSlot"
                  #before-table
                >
                  <slot name="before-table" />
                </template>
                <template
                  v-if="hasAfterTableSlot"
                  #after-table
                >
                  <slot name="after-table" />
                </template>
                <!-- pass all scoped slots to the child -->
                <template
                  v-for="(_, name) in $slots"
                  #[name]="slotData"
                >
                  <slot
                    :name="name"
                    v-bind="slotData"
                  />
                </template>
              </sp-vuetable>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-if="loading" />
  </div>
</template>

<script>
import SearchBar from './FilterTable/SearchBar.vue';
import SpVuetable from './SpVuetable.vue';
import Loading from '../Loading.vue';

export default {
  components: {
    Loading,
    SearchBar,
    SpVuetable,
  },
  emits: [
    'vuetable:load-success', 'vuetable:load-error',
    'vuetable:cell-clicked', 'vuetable:field-event', 'vuetable:checkbox-toggled',
  ],
  props: {
    apiUrl: {
      type: String,
      default: '',
    },
    apiMode: {
      type: Boolean,
      default: true,
    },
    data: {
      type: [Array, Object],
      default: null,
    },
    loadOnStart: {
      type: Boolean,
      default: true,
    },
    fields: {
      type: Object,
      required: true,
    },
    sortOrder: {
      type: Array,
      default: () => ([]),
    },
    trackBy: {
      type: String,
      default: 'id',
    },
    customParams: {
      type: Object,
      default: () => ({}),
    },
    searchEnabled: {
      type: Boolean,
      default: true,
    },
    searchValue: {
      type: String,
      default: '',
    },
    initialPage: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 25,
    },
    detailRow: {
      type: String,
      default: 'row-details-generic',
    },
    detailRowOptions: {
      type: Object,
      default() {
        return {};
      },
    },
    rowClass: {
      type: [String, Function],
      default: '',
    },
    customSearchId: {
      type: String,
      default: null,
    },
    refresh: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      loading: false,
      searchId: null,
      filterText: '',
    };
  },
  computed: {
    hasFiltersSlot() {
      return !!this.$slots.filters;
    },
    hasButtonsSlot() {
      return !!this.$slots.buttons;
    },
    hasBeforeTableSlot() {
      return !!this.$slots['before-table'];
    },
    hasAfterTableSlot() {
      return !!this.$slots['after-table'];
    },
  },
  methods: {
    addFilter(key, value) {
      this.$refs.vuetable.addFilter(key, value);
    },
    vuetableRef() {
      return this.$refs.vuetable.vuetableRef();
    },
  },
};
</script>

<style scoped>
.filter-wrapper {
  position: relative;
}
</style>
