import App from './App.vue'
import Vue from 'vue'
import VueRouter from 'vue-router';
import VueCompositionAPI, { createApp, h } from '@vue/composition-api'

Vue.use(VueCompositionAPI)

const routes = [
  { path: '/', redirect: '/home' },
  { path: '*', redirect: '/home' },

];

const router = new VueRouter({ routes, mode: 'history' });
const app = createApp({
  router,
  render: () => h(App)
})


app.mount('#app')


import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '918385212039-sqqqgs3tr4jtn744kghddi2u12b6hdt2.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'consent',
  fetch_basic_profile: true
}
Vue.use(GAuth, gauthOption)