import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
    { path: '/compass', component: CompassComponent },
    { path: '/register', component: RegisterComponent },
    { path: '/profile', component: ProfileComponent }
];

const router = new VueRouter({
    mode: 'history',
    routes
});

const app = new Vue({
    el: '#app',
    router
});
