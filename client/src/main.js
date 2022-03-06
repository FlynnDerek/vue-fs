import Vue from 'vue'
import App from './App.vue'
import vuefs from 'vuefs'

Vue.config.productionTip = false

Vue.use(vuefs)

new Vue({
  render: h => h(App),
}).$mount('#app')
