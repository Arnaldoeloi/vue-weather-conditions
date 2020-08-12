import Vue from 'vue'
import VueRouter from 'vue-router'
import Weather from '../views/Weather.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/*',
    name: 'Home',
    component: Weather,
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
