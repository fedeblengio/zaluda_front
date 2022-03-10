import App from './App.vue'
import Vue from 'vue'
import VueRouter from 'vue-router';
import CountryFlag from 'vue-country-flag'

import idolComponent from './components/idolComponent.vue';
import BodyComponent from './components/bodyComponent.vue';
import ErrorComponent from './components/ErrorComponent.vue';
import confirmationComponent from './components/confirmationComponent.vue';
import profileComponent from './components/profileComponent.vue';

Vue.component('country-flag', CountryFlag)
Vue.use(VueRouter);

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'body', component: BodyComponent },
    { path: '/confirmation', name: 'confirmationComponent', component: confirmationComponent },
    { path: '/profile', name: 'profileComponent', component: profileComponent },
    { path: '/:Datos', name: 'idolComponent', component: idolComponent },
    { path: '*', name: 'error404', component: ErrorComponent },

];

const router = new VueRouter({ routes, mode: 'history' });

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')

import GAuth from 'vue-google-oauth2'
const gauthOption = {
    clientId: '918385212039-sqqqgs3tr4jtn744kghddi2u12b6hdt2.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'consent',
    fetch_basic_profile: true
}
Vue.use(GAuth, gauthOption)