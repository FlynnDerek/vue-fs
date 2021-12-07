import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

require('../node_modules/bootstrap/dist/css/bootstrap.css')
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
import vuetify from '@/plugins/vuetify' // path to vuetify export

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App),
}).$mount('#app')
