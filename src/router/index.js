import Vue from 'vue'
import VueRouter from 'vue-router'
import Weather from '../views/Weather.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Weather,
    meta: {
      title: 'Weather Conditions',
      metaTags: [
        {
          name: 'description',
          content: 'The home page'
        }
      ]
    }
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
