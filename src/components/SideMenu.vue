<template>
    <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
<!--        暂不递归生成-->
        <template v-for="route in routes" >
            <a-menu-item :key="route.name" v-if="!route.children" @click="handleClick">
                <a-icon :type="route.meta.icon" />
                <span>{{route.meta.title}}</span>
            </a-menu-item>
            <a-sub-menu :key="route.name" v-else>
                <span slot="title"><a-icon :type="route.meta.icon" /><span>{{route.meta.title}}</span></span>
                <template  v-for="r in route.children" >
                    <a-menu-item :key="r.name" v-if="!r.children" @click="handleClick">
                        <a-icon :type="r.meta.icon" />
                        <span>{{route.meta.title}}</span>
                    </a-menu-item>
                </template>
            </a-sub-menu>
        </template>
    </a-menu>
</template>

<script>
    export default {
        name: "SideMenu",
        data() {
            return {
                routes: []
            };
        },
        mounted() {
            this.routes = this.$router.options.routes.find(route => route.name === 'home').children;
        },
        methods: {
            handleClick(e) {
                if (this.$route.name === e.key) {
                    return;
                }
                this.$router.push({
                    name: e.key
                });
            }
        }
    }
</script>

<style scoped>

</style>