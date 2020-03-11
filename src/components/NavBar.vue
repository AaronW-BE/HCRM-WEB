<template>
    <div class="action-container">
        <div class="notice-icon" @click="$router.push({name: 'userNotice'}).catch(() => {})">
            <a-badge
                    :count="notifications.length"
                    :numberStyle="{fontSize: '8px'}"
            >
                <a-icon type="bell" style="font-size: 20px;"/>
            </a-badge>
        </div>
        <a-dropdown>
            <span class="ant-dropdown-link">
            <a-avatar shape="square" icon="user" /> {{loginInfo.name}}
<!--                【{{loginInfo.roleName}}】-->
            </span>
            <a-menu slot="overlay">
                <a-menu-item>
                        <a-icon type="user" />个人中心
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item>
                    <a-icon type="poweroff" />
                    <span @click="() => $router.replace({name: 'login'})">退出登录</span>
                </a-menu-item>
            </a-menu>
        </a-dropdown>
    </div>
</template>

<script>
    import {API} from "../api";
    import {LoginInfo} from "../api/template";

    export default {
        name: "NavBar",
        data() {
            return {
                loginInfo: {},
                notifications: [],
                count: null
            };
        },
        mounted() {
            API(LoginInfo).then(res => {
                this.loginInfo = res.data;
                const permissions = res.data.permissions;
                this.notifications = res.data.notifications;
                sessionStorage.setItem('hcm_permission', permissions.join(','))
            });
        },
        methods: {

        }
    };
</script>

<style scoped>
.action-container {
    display: flex;
    padding-right: 2rem;
}
    .notice-icon {
        margin-right: 1.5rem;
    }
</style>
