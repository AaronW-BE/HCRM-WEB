<template>
  <div class="home">
    <Button v-permission="permission">Create</Button>
    <Button type="danger">Button</Button>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

import {Button} from 'ant-design-vue'

export default {
  name: 'Home',
  data() {
    return {
      permission: 'delete'
    }
  },
  components: {
    HelloWorld, Button
  }
}
</script>
