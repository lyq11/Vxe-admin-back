import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './i18n'
import pinia from './store'

import VxeTable from 'vxe-table'
import 'vxe-table/lib/style.css'

import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'

import './style/style.scss'
import './plugins'

import PageView from './views/layout/PageView.vue'

// import './extend-cell-area/vxe-table-extend-cell-area.es6.min'
// import './extend-cell-area/vxe-table-extend-cell-area.min.css'
// VxeUI.setConfig({
//     // showAuthLog: true, // 是否在控制台显示授权信息，专业版支持关闭
//     authId: '3h34mde1oh1btxa4', // 获取授权后在官网登录后进入“用户中心”查看
//     onAuth (e) {
//       // 打印授权状态
//       console.log(e)
//     }
//   })
const app = createApp(App)

app.component('PageView', PageView)

app.use(router).use(i18n).use(pinia).use(VxeUI).use(VxeTable).mount('#app')
