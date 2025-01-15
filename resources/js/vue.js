import { instance } from "./vendor/secure-vue/widgets/SecureVue.js";
import ExampleComponent from "./components/ExampleComponent.vue";
import Sip from "./components/Sip.vue";
import Compass from "./components/Compass.vue";
import {createPinia} from "pinia";
import ArtistDetails from "./components/ArtistDetails.vue";

const pinia = createPinia();

instance
    .component('example-component', ExampleComponent)
    .component('sip', Sip)
    .component('Compass', Compass)
    .component('ArtistDetails', ArtistDetails)
    .plugin(pinia)
    .run();
