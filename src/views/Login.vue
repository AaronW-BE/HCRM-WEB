<template>
    <div class="login-wrap">
            <a-form id="components-form-demo-normal-login" :form="form" class="login-form login-input" @submit="handleSubmit">
                <h2 style="text-align: center">客户关系管理</h2>
                <a-alert message="管理员用户名：admin, 密码： 123456" />
                <a-form-item>
                    <a-input
                            v-decorator="['username',
          { rules: [{ required: true, message: '请输入用户名' }] }
        ]" placeholder="用户名">
                        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input
                            v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入用户密码' }] }
        ]"
                            type="password" placeholder="请输入密码">
                        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-checkbox
                            v-decorator="[
                              'remember',
                              {
                                valuePropName: 'checked',
                                initialValue: true,
                              }
                            ]"
                            >
                        Remember me
                    </a-checkbox>
                    <a-button type="primary" html-type="submit" class="login-form-button">
                        登录
                    </a-button>
                </a-form-item>
            </a-form>
    </div>
</template>

<script>
    import {API} from "../api";
    import {Login, LoginInfo} from "../api/template";
    import {setToken} from "../utils/tokenUtils";

    export default {
        name: "Login",
        data() {
            return {
                checkNick: false,
                form: this.$form.createForm(this),
            }
        },
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
        methods: {
            handleSubmit (e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        API(Login, {
                            data: values
                        }).then(res => {
                            const token = res.data.token;
                            const expire = res.data.expire;
                            setToken(token, expire);

                            API(LoginInfo).then(res2 => {
                                sessionStorage.setItem('hcm_permission', res2.data.permissions.join(','))

                                let location = this.$route.query.location || '';
                                if (location) {
                                    window.location.href = location;
                                    return;
                                }
                                this.$router.replace({name: "main"});
                            });

                        })
                    }
                });
            },
        },
    }
</script>

<style scoped>
    .login-wrap{
        width:100%;
        height:100%;
        background:url("../assets/sigin-bg.jpg") no-repeat;
        background-size: cover;
    }
    .login-input{
        width:400px;
        background-color: rgba(255,255,255,.4);
        padding:30px;
        border-radius: 5px;
        margin-top:-200px;
        position: absolute;
        top:50%;
        right:10%;
    }
    #components-form-demo-normal-login .login-form {
        max-width: 300px;
    }
    #components-form-demo-normal-login .login-form-forgot {
        float: right;
    }
    #components-form-demo-normal-login .login-form-button {
        width: 100%;
    }
</style>
