const createSpApp = (comp, options) => {
    const app = createApp(comp, options);

    // Register store plugin
    app.use(store);

    // Register global components
    app.component('flash-toast', FlashToast);
    app.component('verify-password', VerifyPassword);

    app.component('content-2', VueContent2);
    app.component('row', VueRow);
    app.component('column', VueColumn);
    app.component('vue-form', VueForm);
    app.component('content-row', VueContentRow);
    app.component('content-col', VueContentCol);
    app.component('content-box', VueContentBox);
    app.component('content-edit', VueContentEdit);
    app.component('content-editable', VueContentEditable);

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


import ComponentWrapper from './components/ComponentWrapper.vue';
import { registerModule } from './vuex';

export default class SpVue {
    constructor() {
        this.components = {};
        this.plugins = [];
        this.mixins = [];
        this.directives = [];
        this.stores = {};
        this.filtersObj = {};
        this.spModules = [];
    }

    component(name, comp) {
        this.components[name] = comp;
        return this;
    }

    plugin(plugin) {
        this.plugins.push(plugin);
        return this;
    }

    mixin(object) {
        this.mixins.push(object);
        return this;
    }

    directive(name, obj) {
        this.directives[name] = obj;
        return this;
    }

    store(path, comp) {
        this.stores[path] = comp;
        return this;
    }

    filters(filters) {
        this.filtersObj = filters;
        return this;
    }

    addSpModule(func) {
        this.spModules.push(func);
        return this;
    }

    registerComponents(app) {
        for (const [name, comp] of Object.entries(this.components)) {
            app.component(name, comp);
        }
    }

    registerPlugins(app) {
        this.plugins.forEach((plugin) => {
            app.use(plugin);
        });
    }

    registerMixins(app) {
        this.mixins.forEach((mixin) => {
            app.mixin(mixin);
        });
    }

    registerStores() {
        for (const [path, module] of Object.entries(this.stores)) {
            registerModule(path, module);
        }
    }

    initializeSpModules(app) {
        this.spModules.forEach((fn) => {
            fn(app);
        });
    }

    registerFilters(app) {
        app.config.globalProperties.$filters = this.filtersObj;
    }

    run(...constructorArgs) {
        // TODO: Warum läuft das so, und nicht mit Eventlistener auf DOM loaded
        // document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('[data-vue-component]').forEach((el) => {
                const data = {};

                Object.keys(el.dataset).forEach((key) => {
                    if (['vueComponent', 'vueComponentId'].includes(key)) {
                        return;
                    }
                    const matches = key.match(/(.+?)\.parse$/);
                    if (matches) {
                        data[matches[1]] = JSON.parse(el.dataset[key]);
                    } else {
                        data[key] = el.dataset[key];
                    }
                });

                const app = createSpApp(ComponentWrapper, {
                    ...constructorArgs,
                    componentName: el.getAttribute('data-vue-component'),
                    componentProps: data,
                });

                this.initializeSpModules(app);
                this.registerPlugins(app);
                this.registerMixins(app);
                this.registerStores();
                this.registerFilters(app);
                this.registerComponents(app);

                let dataEl = 'data-vue-component';
                if (el.getAttribute('data-vue-component-id')) {
                    dataEl = 'data-vue-component-id';
                }

                const fragment = document.createDocumentFragment();
                app.mount(fragment);
                document.querySelector(`[${dataEl}="${el.getAttribute(dataEl)}"]`).replaceWith(fragment);
            });
        // });
    }
}

const instance = new SpVue();
export { instance };

import { instance } from "./vendor/securepoint/cloud-widgets/SpVue";
import VueTable from "./components/BookingsTable/VueTable.vue";
import DesksTopDown from "./components/BookingsTable/DesksTopDown.vue";
import DesksTable from "./components/DepartmentManagement/DepartmentProperties.vue";
import UserDepartmentRelations from "./components/UserProfile/UserDepartmentRelations.vue";
import AdminInterface from "./components/Departments/AdminInterface.vue";
import {createPinia} from "pinia";

const pinia = createPinia();

instance
  .component('VueTable', VueTable)
  .component('DeskTable', DesksTable)
  .component('DeskTopDown', DesksTopDown)
  .component('UserDepartmentRelations', UserDepartmentRelations)
  .component('AdminInterface', AdminInterface)
  .plugin(pinia)
  .run();
