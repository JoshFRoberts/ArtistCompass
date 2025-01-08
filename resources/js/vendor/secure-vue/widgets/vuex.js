import { createStore } from 'vuex'
import vuexModules from './vuexModules';

const store = createStore({ modules: vuexModules });

const registerModule = (path, module) => {
    if (!store.hasModule(path)) {
        store.registerModule(path, module);
    }
}

export { store, registerModule };
export default store;