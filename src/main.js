import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;

Vue.directive('permission', {
  inserted: function (el, binding) {
    const {value} = binding;
    let exists = false;

    const allowPermission = ['create'];
    if (typeof value === "string") {
      if (allowPermission.indexOf(value) !== -1) {
        exists = true
      }
    }else if (Array.isArray(value)) {
      for (let v of value) {
        if (allowPermission.indexOf(v) !== -1) {
          exists = true;
          break;
        }
      }
    }
    console.log(exists, value);
    if (!exists) {
      el.parentNode.removeChild(el);
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
