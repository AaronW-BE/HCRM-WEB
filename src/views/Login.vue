<template>
    <div v-if="isWeworkBrowser">
      <div class="loading-wrp">
        <a-spin size="large" tip="正在登录企业微信" />
      </div>
    </div>
    <div v-else class="login-wrap">
            <a-form id="components-form-demo-normal-login" :form="form" class="login-form login-input" @submit="handleSubmit">
                <h2 style="text-align: center">客户关系管理</h2>
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
                <a :href="wxScanLoginUrl" target="_parent" style="color: #ffffff"><a-icon type="qrcode" />企业微信扫码登录</a>
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
    import {WeworkUser} from "@/api/wework/user";
    import config from '../config/config';
    export default {
        name: "Login",
        data() {
            return {
                checkNick: false,
                form: this.$form.createForm(this),
                isWeworkBrowser: navigator.userAgent.indexOf('wxwork') !== -1,
                wxScanLoginUrl: '',
            }
        },
        beforeCreate () {
            this.form = this.$form.createForm(this);
        },
      created() {
        let state = "login"; //random store
        if (this.$route.query.code && this.$route.query.state === state && this.$route.query.code) {
          // 请求员工信息
          const code = this.$route.query.code;
          this.weworkUserAuth(code)
          this.isWeworkBrowser = true;
          return;
        }
        let corpId = config.wework.corpId;
        let agentId = config.wework.agentId;
        let redirectUrl = location.href;

        if (navigator.userAgent.indexOf("wxwork") !== -1) {
          // 微信浏览器
          let loginUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${corpId}&redirect_uri=${redirectUrl}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`;
          console.log(loginUrl);
          location.href = loginUrl;
        }

        this.wxScanLoginUrl = `https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=${corpId}&agentid=${agentId}&redirect_uri=${redirectUrl}&state=${state}`;
        console.log(this.wxScanLoginUrl);
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
                            this.setLoginInfo();
                        })
                    }
                });
            },
        weworkUserAuth(code) {
          if (navigator.userAgent.indexOf("wxwork") !== -1) {
            // message.warn(window.location.href, 1)
            // return;
          }
          API(WeworkUser, {
            data: {
              code
            }
          }).then(res => {
            console.log(res)
            const token = res.data.token;
            const expire = res.data.expire;
            setToken(token, expire);
            this.setLoginInfo();
          });
        },
        setLoginInfo() {
          API(LoginInfo).then(res2 => {
            sessionStorage.setItem('hcm_permission', res2.data.permissions.join(','))

            let location = this.$route.query.location || '';
            if (location) {
              window.location.href = location;
              return;
            }
            this.$router.push({name: "main"});
          }).catch(() => {
            this.$message.error("登录失败");
          });
        }
      },
    }
</script>

<style scoped>
    .loading-wrp {
      text-align: center;
      margin-top: 50px;
    }
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
