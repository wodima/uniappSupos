import Vue from 'vue'
import App from './App'
import { http } from '@/api/service.js' // 全局挂载引入，配置相关在该index.js文件里修改

// 注册全局组件
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
// 引入封装的接口api
import { myRequest } from '@/api/request.js'
// 挂在Vue属性 全局通过this.$myRequest()可以访问到
Vue.prototype.$myRequest = myRequest


Vue.prototype.$http = http
Vue.config.productionTip = false

App.mpType = 'app'

new Vue({
	data() {
	    return {
	      token: "token",
	    }
	  },
})
const app = new Vue({
    ...App,
})
app.$mount()
