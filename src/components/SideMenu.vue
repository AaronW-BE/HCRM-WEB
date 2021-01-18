<template>
    <a-menu theme="dark" mode="inline" :defaultSelectedKeys="defaultSelectedKeys" :defaultOpenKeys="defaultOpenKeys">
<!--        暂不递归生成-->
        <template v-for="route in routes" >
            <template v-if="!route.children">
                <template v-if="!route.meta.unShow">
                    <a-menu-item :key="route.name" v-permission="route.meta.permission || []">
                        <router-link :to="{name: route.name}">
                          <a-icon :type="route.meta.icon" />
                          {{route.meta.title}}
                        </router-link>
                    </a-menu-item>
                </template>
            </template>

            <template v-else>
                <a-sub-menu :key="route.name" v-permission="route.meta.permission || []">
                    <span slot="title"><a-icon :type="route.meta.icon" /><span>{{route.meta.title}}</span></span>
                    <template  v-for="r in route.children" >
                        <template v-if="!r.meta.unShow">
                            <a-menu-item :key="r.name" v-permission="route.meta.permission || []">
                              <router-link :to="{name: r.name}">
                                <a-icon :type="route.meta.icon" />
                                {{route.meta.title}}
                              </router-link>
                            </a-menu-item>
                        </template>
                    </template>
                </a-sub-menu>
            </template>

        </template>
    </a-menu>
</template>

<script>
    export default {
        name: "SideMenu",
        data() {
            return {
                routes: [],
                defaultOpenKeys: [],
                defaultSelectedKeys: []
            };
        },
        created() {
            this.defaultSelectedKeys = [this.$route.name];
            this.defaultOpenKeys = [this.$route.matched[this.$route.matched.length - 2].name];
        },
        mounted() {
            this.routes = this.$router.options.routes.find(route => route.name === 'home').children;
        },
    }
</script>

<style scoped>

</style>
