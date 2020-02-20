<template>
    <a-layout class="page-layout" id="components-layout-demo-custom-trigger">
        <a-layout-sider :trigger="null" collapsible v-model="collapsed">
            <div class="logo-wrap">
                <div class="logo-img">
                    <img src="../assets/logo.png" />
                </div>
                <div class="logo-text">
                    客户关系管理
                </div>
            </div>
            <a-menu theme="dark" mode="inline" :defaultSelectedKeys="['1']">
                <a-menu-item @click="handleClick" v-for="(item,index) in menu_list" :key="index">
                    <a-icon :type="item.type"/>
                    <span>{{item.label}}</span>
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
                collapsed: false,
                menu_list:[
                    {
                        label:'首页',
                        type:'user'
                    },
                    {
                        label:'详情页',
                        type: 'dingding'
                    },
                    {
                        label:'订单',
                        type: 'wechat'
                    }
                ]
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
    .logo-wrap {
        height:64px;
       display: flex;
        justify-content: space-around;
        align-items: center;
        padding:10px 25px;
    }
    .logo-img {

    }
    .logo-img img{
        width: 40px;
    }
    .logo-text{
        color:#ccc;
        font-size: 1rem;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
    }
</style>
