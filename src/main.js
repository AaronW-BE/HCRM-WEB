import Vue from 'vue'
import App from './App.vue'
import router from './router'

import {Layout, Menu, Icon,Button,Form,Input,Checkbox, Dropdown, Avatar, Badge, Table,
  Card, Popconfirm
} from "ant-design-vue";

Vue.use(Layout);
Vue.use(Menu);
Vue.use(Icon);
Vue.use(Button);
Vue.use(Form);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Dropdown);
Vue.use(Avatar);
Vue.use(Badge);
Vue.use(Table);
Vue.use(Card);
Vue.use(Popconfirm);

import PermissionPlugin from './dicrectives/permission';

Vue.config.productionTip = false;

Vue.use(PermissionPlugin);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
