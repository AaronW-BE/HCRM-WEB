import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false;

Vue.directive('permission', {
  inserted: function (el, binding) {
    const {value} = binding;
    if (value !== 'create') {
      el.parentNode.removeChild(el);
    }
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
