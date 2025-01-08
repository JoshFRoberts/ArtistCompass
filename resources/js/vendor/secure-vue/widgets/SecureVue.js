import { createSpApp } from './vue';
import ComponentWrapper from './components/ComponentWrapper.vue';
import { registerModule } from './vuex';

export default class SecureVue {
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

const instance = new SecureVue();
export { instance };
