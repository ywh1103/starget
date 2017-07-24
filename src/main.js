import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'
import axios from 'axios'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(axios)

import login from './component/login.vue'
import header from './component/header.vue'

import home from './component/home.vue'
import settlement from './component/settlement.vue'
import accounting from './component/accounting.vue'
import taxfree from './component/taxfree.vue'
import admin from './component/admin.vue'

import detail from './component/detail.vue'
import setDetail from './component/setDetail.vue'
import accountDetail from './component/accountDetail.vue'
import taxfreeDetail from './component/taxfreeDetail.vue'


var route=[
   /* { path: '*', redirect: '/' },*/
    {path:"/",component:login},
    {path:"/header",component:header,
        children:[
            {path:"/",component:home},
            {path:"/settlement",component:settlement},
            {path:"/accounting",component:accounting},
            {path:"/taxfree",component:taxfree},
            {path:"/admin",component:admin},
            {path:"/detail",component:detail},
            {path:"/setDetail",component:setDetail},
            {path:"/accountDetail",component:accountDetail},
            {path:"/taxfreeDetail",component:taxfreeDetail}
        ]
    }
]

var router=new VueRouter({
    mode: 'history',
    routes:route
})

new Vue({
  el: '#app',
   router:router,
  render: h => h(App)
})
