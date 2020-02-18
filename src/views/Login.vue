<template>
    <div>
        <h1>Login</h1>
        <Button type="primary" @click="() => $router.replace({name: 'main'})">登陆</Button>
    </div>
</template>

<script>
    import {Button} from 'ant-design-vue';
    export default {
        name: "Login",
        components: {Button},
    }
</script>

<style scoped>

</style>