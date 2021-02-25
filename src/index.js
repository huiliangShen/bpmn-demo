import Vue from 'vue'
import App from './app/App'
import router from './app/router'
import store from './app/store'
import './index.less'
import {Button, Card, Row, Col, Radio, Form} from 'ant-design-vue'
// bpmn css
import 'bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css'
import 'bpmn-js/dist/assets/diagram-js.css'
import 'bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css'
import 'diagram-js-minimap/assets/diagram-js-minimap.css'
import './common/custom.less'

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Radio)
Vue.use(Form)

new Vue({
    render: (h) => h(App),
    router,
    store
}).$mount('#app')
