<template>
  <div class="home">
    <Button v-permission="permission">Delete Permission</Button>
    <Button type="danger" v-permission="permission2">Create, Delete Permission</Button>
  </div>
</template>

<script>
// @ is an alias to /src

import {Button} from 'ant-design-vue'

export default {
  name: 'Home',
  data() {
    return {
      permission: 'delete',
      permission2: ['create', 'delete']
    }
  },
  components: {
    Button
  },
  created() {
  }
}
</script>
