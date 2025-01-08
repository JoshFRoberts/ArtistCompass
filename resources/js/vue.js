import { instance } from "./vendor/secure-vue/widgets/SecureVue.js";
import ExampleComponent from "./components/ExampleComponent.vue";
import Sip from "./components/Sip.vue";


instance
    .component('example-component', ExampleComponent)
    .component('sip', Sip)
    .run();
