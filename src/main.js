import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Header, Button, IndexList, IndexSection, TabContainer, TabContainerItem, MessageBox, Switch, Indicator, Toast } from 'mint-ui'
import axios from 'axios'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

Vue.component(Header.name, Header)
Vue.component(Button.name, Button)
Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)
Vue.component(Switch.name, Switch)
Vue.prototype.MessageBox = MessageBox
Vue.prototype.$axios = axios
Vue.prototype.Indicator = Indicator
Vue.prototype.Toast = Toast

if (process.env.NODE_ENV === "development") {
  //开发环境下的代理地址，解决本地跨域跨域，配置在vue.config.js里
  Vue.prototype.server = '/api'
} else {
  //生产环境下的地址
  Vue.prototype.server = 'http://139.224.70.36:8443'
}


// Vue.prototype.server = 'http://139.224.70.36:8443'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
