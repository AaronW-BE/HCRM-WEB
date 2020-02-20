<template>
    <div class="login-wrap">
            <a-form id="components-form-demo-normal-login" :form="form" class="login-form login-input" @submit="handleSubmit">
                <h2 style="text-align: center">客户关系管理</h2>
                <a-form-item>
                    <a-input
                            v-decorator="['userName',
          { rules: [{ required: true, message: 'Please input your username!' }] }
        ]" placeholder="Username">
                        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input
                            v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] }
        ]"
                            type="password" placeholder="Password">
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
                        Log in
                    </a-button>
                </a-form-item>
            </a-form>
    </div>
</template>

<script>
    import {API, request} from "../api";
    import {Login} from "../api/template";

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
                        console.log('Received values of form: ', values);
                        // 现在这样请求
                        API(Login, {
                            data: values
                        }).then(res => {
                            console.log(res);
                        });
                    }
                });
            },
        },
        // components: {Button},
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
        height:300px;
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
