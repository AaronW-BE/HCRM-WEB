<template>
    <a-layout class="page-layout" id="components-layout-demo-custom-trigger">
        <a-layout-sider :trigger="null" collapsible v-model="collapsed">
            <div class="logo"/>
            <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
                <a-menu-item key="main" @click="handleClick">
                    <a-icon type="user"/>
                    <span>主页</span>
                </a-menu-item>
                <a-menu-item key="about" @click="handleClick">
                    <a-icon type="video-camera"/>
                    <span>关于</span>
                </a-menu-item>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon
                        class="trigger"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="()=> collapsed = !collapsed"
                />
            </a-layout-header>
            <a-layout-content
                    :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
            >
                <router-view/>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>

<script>
    export default {
        name: "collapsed",
        data() {
            return {
                collapsed: false
            }
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

    .page-layout .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }
</style>