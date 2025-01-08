import { instance } from "./vendor/secure-vue/widgets/SecureVue.js";
import ExampleComponent from "./components/ExampleComponent.vue";
import Sip from "./components/Sip.vue";
import Compass from "./components/Compass.vue";


instance
    .component('example-component', ExampleComponent)
    .component('sip', Sip)
    .component('Compass', Compass)
    .run();
