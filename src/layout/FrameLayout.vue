<template>
    <a-layout class="page-layout" id="components-layout-demo-custom-trigger">
        <a-layout-sider :trigger="null" collapsible v-model="collapsed">
            <div class="logo-wrap" @click="() => $router.replace({name: 'home'}).catch(e => e)">
                <div class="logo-img">
                    <img src="../assets/logo/CRM.png" />
                </div>
                <div class="logo-text" v-if="!collapsed">
                    HCRM
                </div>
            </div>
            <side-menu />
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0; box-shadow: 0 2px 1px 2px #e6e6e6">
                <div style="display: flex; justify-content: space-between">
                    <a-icon
                            class="trigger"
                            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                            @click="()=> collapsed = !collapsed"
                    />
                    <nav-bar />
                </div>
            </a-layout-header>
            <a-layout-content
                    :style="{ margin: '15px 16px', minHeight: '280px' }"
            >
                <router-view/>
            </a-layout-content>
            <a-layout-footer>
                Copyright &copy; {{ new Date().getFullYear() }}  Heymom .Inc. CRM. ❤
            </a-layout-footer>
        </a-layout>
    </a-layout>
</template>

<script>
    import NavBar from "../components/NavBar";
    import SideMenu from "../components/SideMenu";
    export default {
        name: "collapsed",
        components: {SideMenu, NavBar},
        data() {
            return {
                collapsed: false,
            }
        },
        computed: {

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
<style>
    .page-layout {
        height: 100vh;
    }
    .page-layout .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
    }

    .page-layout .trigger:hover {
        color: #1890ff;
    }
    .logo-wrap {
        height: 64px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #002140;
        cursor: pointer;
    }
    .logo-img {

    }
    .logo-img img{
        width: 32px;
    }
    .logo-text{
        color:#ffffff;
        font-size: 1.2rem;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        margin-left: 1rem;
    }
</style>
