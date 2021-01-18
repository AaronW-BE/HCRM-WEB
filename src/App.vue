<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view/>
    </div>
  </a-locale-provider>
</template>

<script>
  import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
  export default {
    data() {
      return {
        locale: zhCN
      }
    },
    mounted() {
      document.getElementById('app').style.display = "block";
      document.getElementById("page-loading").style.display = "none";
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100vh;
}
  .form-container {
    padding-bottom: 1rem;
  }
  .box-container {
    margin-bottom: 10px;
  }
</style>
