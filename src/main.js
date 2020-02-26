import Vue from 'vue'
import App from './App.vue'
import router from './router'

import {Layout, Menu, Icon,Button,Form,Input,Checkbox, Dropdown, Avatar, Badge, Table,
<<<<<<< HEAD
  Card, Popconfirm,Radio,DatePicker,TimePicker,Select,Divider,Cascader
=======
  Card, Popconfirm, List, Modal
>>>>>>> 052b8e665ac93022e03667c919dd8b4743559263
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
<<<<<<< HEAD
Vue.use(Radio);
Vue.use(DatePicker);
Vue.use(TimePicker);
Vue.use(Select);
Vue.use(Divider);
Vue.use(Cascader);
=======
Vue.use(List);
Vue.use(Modal);
>>>>>>> 052b8e665ac93022e03667c919dd8b4743559263

import PermissionPlugin from './dicrectives/permission';

Vue.config.productionTip = false;

Vue.use(PermissionPlugin);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
