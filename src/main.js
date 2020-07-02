import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

Vue.config.productionTip = false

const dotenv      = require('dotenv');
var dotenvExpand  = require('dotenv-expand');
var myEnv = dotenv.config()
dotenvExpand(myEnv)  

console.log(process.env.VUE_APP_OPEN_WEATHER_API_KEY)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
