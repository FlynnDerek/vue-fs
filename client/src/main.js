import Vue from 'vue'

require('../node_modules/bootstrap/dist/css/bootstrap.css')
import vuetify from '@/plugins/vuetify' // path to vuetify export

import App from './App.vue'



Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
