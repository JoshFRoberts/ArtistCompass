import { VuetableFieldCheckbox } from 'vue3-vuetable';
import Loading from './components/Loading.vue';
import SpVueTable from './components/Vuetable/SpVuetable.vue';
import SpFilterVueTable from './components/Vuetable/SpFilterVuetable.vue';
import BooleanFilter from './components/Vuetable/FilterTable/Boolean.vue';
import RadioFilter from './components/Vuetable/FilterTable/RadioButtons.vue';
import GenericDetailRow from './components/Vuetable/GenericDetailRow.vue';

const initializeVuetable = (app) => {
  app.component('Loading', Loading);
  app.component('SpVuetable', SpVueTable);
  app.component('SpFilterVuetable', SpFilterVueTable);
  app.component('SpFilterVuetableBoolean', BooleanFilter);
  app.component('SpFilterVuetableRadio', RadioFilter);
  app.component('RowDetailsGeneric', GenericDetailRow);
  app.component('VuetableFieldCheckbox', VuetableFieldCheckbox);
};

export { initializeVuetable };
