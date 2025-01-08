import { createApp, defineComponent } from 'vue'



import VueContent2 from './components/layout/content2.vue';
import VueRow from './components/layout/row.vue';
import VueColumn from './components/layout/column.vue';

import VueContentRow from './components/layout/contentRow.vue'
import VueContentCol from './components/layout/contentCol.vue'
import VueContentBox from './components/layout/contentBox.vue'

import VueContentEdit from './components/content/edit.vue';

import * as FormFieldTypes from "./components/VueForm/Types.js";
import Str from './components/Helper/Str.js';
import store from './vuex.js';
import Boxes from "./demo/Boxes.vue";
import Forms from "./demo/Forms.vue";

const createSpApp = (comp, options) => {
    const app = createApp(comp, options);


    // Register store plugin
    app.use(store);

    // Register global components

    app.component('content-2', VueContent2);
    app.component('row', VueRow);
    app.component('column', VueColumn);
    app.component('content-row', VueContentRow);
    app.component('content-col', VueContentCol);
    app.component('content-box', VueContentBox);
    app.component('content-edit', VueContentEdit);

    Object.keys(FormFieldTypes).forEach(key => {
        app.component(Str.kebap(key), defineComponent({
            extends: FormFieldTypes[key],
            props: {
                type: {
                    default: Str.kebap(key).replace(/-type$/, '')
                }
            }
        }));
    });

    if (location.href.indexOf('dev/vue-demo') > -1) {
        app.component('demo-forms', Forms);
        app.component('demo-boxes', Boxes);
    }

    // Add global axios property
    app.config.globalProperties.$http = window.axios;

    return app
}

export { createSpApp };
