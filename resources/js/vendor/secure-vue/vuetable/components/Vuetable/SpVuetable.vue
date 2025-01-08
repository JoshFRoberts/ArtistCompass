<template>
  <div class="dataTables_wrapper">
    <div
      v-if="hasBeforeTableSlot"
      v-show="!loading"
      class="row toolbar"
    >
      <div class="col-xs-24 padding-xs-b">
        <div class="bg-white padding-xs-x">
          <div class="row flexrow flex-wrap">
            <div class="col-xs col-md padding-xs">
              <slot name="before-table"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <vuetable
      ref="vuetable"
      class="table-responsive"
      :api-url="apiUrl"
      :api-mode="apiMode"
      :data="data"
      :fields="transformedFields"
      :transform="transform"
      :css="css"
      pagination-path=""
      :per-page="perPage"
      :multi-sort="true"
      multi-sort-key="ctrl"
      :sort-order="sortOrder"
      :append-params="moreParams"
      :http-fetch="httpFetch"
      :render-icon="renderIcon"
      :track-by="trackBy"
      :show-sort-icons="true"
      :sort-params="getSortParam"
      :query-params="{ sort: 'order', page: 'page', perPage: 'per_page' }"
      :detail-row-component="detailRow"
      :detail-row-options="detailRowOptions"
      :row-class="rowClass"
      :custom-params="customParams"
      :load-on-start="loadOnStart"
      :no-data-template="$t(noDataTemplate)"
      :initial-page="initialPage"
      @vuetable:cell-clicked="onCellClicked"
      @vuetable:field-event="onFieldEvent"
      @vuetable:pagination-data="onPaginationData"
      @vuetable:loading="loading = true; $emit('loading')"
      @vuetable:loaded="loading = false; $emit('loaded')"
      @vuetable:load-error="onLoadError(); $emit('vuetable:load-error', $event)"
      @vuetable:checkbox-toggled="$emit('vuetable:checkbox-toggled', $event)"
      @vuetable:load-success="$emit('vuetable:load-success', $event)"
    >
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
    </vuetable>
    <div v-show="!loading">
      <vuetable-pagination-info
        ref="paginationInfo"
        :css="css.pagination"
        info-class="pull-left"
        :info-template="$tm('pagination.vuetable.info')"
        :no-data-template="$t('pagination.vuetable.no-data')"
      />
      <vuetable-pagination
        ref="pagination"
        :css="css.pagination"
        @vuetable-pagination:change-page="onChangePage"
      />
    </div>
    <div
      v-if="hasAfterTableSlot"
      v-show="!loading"
      class="row toolbar margin-xs-t-2"
    >
      <div class="col-xs-24 padding-xs-b">
        <div class="bg-white padding-xs-x">
          <div class="row flexrow flex-wrap">
            <div class="col-xs col-md padding-xs">
              <slot name="after-table"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loading v-if="!hasFilter && loading"/>
  </div>
</template>

<script>

import {
  Vuetable, VuetablePagination, VuetablePaginationInfo,
} from 'vue3-vuetable';
import _merge from 'lodash/merge';
import {
  axios, BootstrapStyle, flatten,
} from '../../bootstrap';

export default {
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationInfo,
  },
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
      default: () => ({}),
    },
    sortOrder: {
      type: Array,
      default: () => ([]),
    },
    perPage: {
      type: Number,
      default: 25,
    },
    initialPage: {
      type: Number,
      default: 1,
    },
    trackBy: {
      type: String,
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
    customParams: {
      type: Object,
      default: () => ({}),
    },
    searchId: {
      type: String,
      default: '',
    },
    hasFilter: {
      type: Boolean,
      default: false,
    },
    rowClass: {
      type: [String, Function],
      default: '',
    },
    refresh: {
      type: Number,
      default: 0,
    },
    filterText: {
      type: String,
      default: '',
    },
  },
  emits: [
    'vuetable:loading', 'vuetable:loaded', 'vuetable:load-success', 'vuetable:load-error',
    'loading', 'loaded', 'cell-clicked', 'field-event', 'vuetable:checkbox-toggled',
  ],
  data() {
    return {
      css: BootstrapStyle,
      transformedFields: this.transformFields(),
      loading: false,
      noDataTemplate: 'pagination.vuetable.no-data',
      filters: {},
    };
  },
  computed: {
    moreParams() {
      return this.getMoreParams();
    },
    hasBeforeTableSlot() {
      return !!this.$slots['before-table'];
    },
    hasAfterTableSlot() {
      return !!this.$slots['after-table'];
    },
  },
  watch: {
    changed() {
      this.$nextTick(this.$refs.vuetable.refresh);
    },
    refresh() {
      this.$nextTick(this.$refs.vuetable.refresh);
    },
    filterText() {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        this.$nextTick(() => this.$refs.vuetable.refresh());
      }, 500);
    },
    filters: {
      deep: true,
      handler() {
        if (this.timeout) {
          clearTimeout(this.timeout);
        }
        this.timeout = setTimeout(() => {
          this.$nextTick(() => this.$refs.vuetable.refresh());
        }, 500);
      },
    },
  },
  mounted() {
    if (!this.loadOnStart) {
      this.initIntersectionObserver();
    }
  },

  methods: {
    /**
     *  only load the datatables when the element scrolls into the viewport
     */
    initIntersectionObserver() {
      if (!('IntersectionObserver' in window)) {
        this.$nextTick(this.$refs.vuetable.refresh);
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        // Use `intersectionRatio` because of Edge 15's
        // lack of support for `isIntersecting`.
        // See: https://github.com/w3c/IntersectionObserver/issues/211
        if (entries[0].intersectionRatio <= 0) return;

        // Cleanup the observer when it's not
        // needed anymore.
        observer.unobserve(this.$el);
        // The `componentFactory()` resolves
        // to the result of a dynamic `import()`
        // which is passed to the `resolveComponent()`
        // function.
        this.$nextTick(this.$refs.vuetable.refresh);
      });
      // We observe the root `$el` of the
      // mounted loading component to detect
      // when it becomes visible.
      observer.observe(this.$el);
    },
    /**
     * takes the datatable-column format that was passed in as a prop
     * and converts them it usage with vuetable
     * @returns {Array}
     */
    transformFields() {
      const fields = [];
      Object.values(this.fields).forEach((column) => {
        const obj = {
          name: column.name,
          title: column.label,
        };
        if (column.orderable === true) {
          obj.sortField = column.name;
        }
        if (typeof column.visible !== 'undefined') {
          obj.visible = column.visible;
        }
        fields.push(obj);
      });
      return fields;
    },

    /**
     * creates the "columns" array which is used by the server-side
     * datatable implementation
     * @returns {{columns: Array}}
     */
    getMoreParams() {
      const params = [];
      Object.values(this.fields).forEach((column) => {
        params.push({
          name: column.name,
          data: column.data,
          searchable: column.searchable,
        });
      });

      return {
        columns: params,
        search: {
          value: this.filterText,
        },
        ...this.customParams,
      };
    },

    getSortParam(sortOrder) {
      const params = [];
      Object.values(sortOrder).forEach((sort) => {
        params.push({
          column: this.transformedFields.findIndex((x) => x.name === sort.field),
          dir: sort.direction,
        });
      });
      return params;
    },

    /**
     * performs the AJAX request to the server-side datatable implementation
     * after flattening the columns-array
     * @param apiUrl
     * @param httpOptions
     * @returns {AxiosPromise<any>}
     */
    httpFetch(apiUrl, httpOptions) {
      const finalHttpOptions = httpOptions;
      const {page, per_page: perPage} = httpOptions.params;
      delete finalHttpOptions.params.page;
      delete finalHttpOptions.params.per_page;

      finalHttpOptions.params = flatten(finalHttpOptions.params);
      finalHttpOptions.params.start = (page - 1) * perPage;
      finalHttpOptions.params.length = perPage;
      Object.keys(this.filters).forEach((key) => finalHttpOptions.params[key] = this.filters[key]);

      return axios.get(apiUrl, finalHttpOptions);
    },

    /**
     * transforms the data returned from the server
     * @param data
     * @returns {*}
     */
    transform(data) {
      const finalData = data;
      const finalRows = [];

      Object.values(data.data).forEach((row) => {
        let finalRow = {};
        Object.keys(row).forEach((key) => {
          if (this.fields[key]) {
            finalRow = _merge(
              finalRow,
              this.convertDotPathToNestedObject(this.fields[key].name, row[key]),
            );
          } else {
            finalRow[key] = row[key];
          }
        });
        finalRows.push(finalRow);
      });

      finalData.data = finalRows;

      const paginationData = {
        total: data.recordsFiltered,
        per_page: data.length,
        current_page: data.start / data.length + 1,
        last_page: Math.ceil(data.recordsFiltered / data.length),
        from: data.start + 1,
        to: Math.min(data.recordsFiltered, data.start + data.length),
      };

      return Object.assign(finalData, paginationData);
    },

    convertDotPathToNestedObject(path, value) {
      const [last, ...paths] = path.split('.').reverse();
      return paths.reduce((acc, el) => ({[el]: acc}), {[last]: value});
    },

    renderIcon(classes) {
      return `<i class="${classes.join(' ')}"></i>`;
    },

    /**
     * create the paginationData that is expected by vuetable-2
     * @param response
     */
    onPaginationData(response) {
      this.$refs.pagination.setPaginationData(response);
      this.$refs.paginationInfo.setPaginationData(response);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    onCellClicked(e) {
      this.preventOpenDetailRow(e);
      this.$emit('cell-clicked', {data: e.data, field: e.field, event: e.event});
    },
    onFieldEvent(e) {
      this.preventOpenDetailRow(e);
      this.$emit('field-event', {data: e.data, field: e.field, event: e.event});
    },
    preventOpenDetailRow(e) {
      if (window.innerWidth >= 992 && this.detailRow === 'row-details-generic') {
        return;
      }

      const path = e.event.path || e.event.composedPath && e.event.composedPath();
      const preventTags = ['a', 'button', 'input', 'select', 'textarea'];
      const wasTrigger = path && path
        .filter((el) => typeof el.tagName !== 'undefined')
        .find((el) => preventTags.indexOf(el.tagName.toLowerCase()) > -1
          || el.classList.contains('dropdown-menu')
          || el.classList.contains('prevent-detailrow'));

      if (!wasTrigger) {
        this.$refs.vuetable.toggleDetailRow(e.data[this.trackBy]);
      }
    },
    /**
     * In case of an error: Replace the "no-data" string with an "error" string.
     */
    onLoadError() {
      this.noDataTemplate = 'common.error';
    },
    vuetableRef() {
      return this.$refs.vuetable;
    },
    addFilter(key, value) {
      this.filters[key] = value;
    },
  },
};
</script>
