<template>
    <div class="login-container">
        <header-top :headTitle="loginWay? '登录':'密码登录'" :goBack="true"></header-top>
        <form class="login_form" v-if="!loginWay">
            <section class="input_container">
                <input type="text" placeholder="账号" v-model.lazy="userAccount"/>
            </section>
            <section class="input_container">
                <input v-if="!showPassword" type="password" placeholder="密码" v-model="passWord"/>
                <input v-else type="text" placeholder="密码" v-model="passWord"/>
                <div class="button_switch" :class="{change_to_text: showPassword}">
                    <div class="circle_button" :class="{trans_to_right: showPassword}"
                         @click="changePassWordType"></div>
                    <span>abc</span>
                    <span>...</span>
                </div>
            </section>
        </form>
    </div>
</template>

<script>
    import headerTop from '../../component/header';

    export default {
        data() {
            return {
                loginWay: false, //登录方式，默认短信登录
                showPassword: false, // 是否显示密码
                phoneNumber: null, //电话号码
                mobileCode: null, //短信验证码
                validate_token: null, //获取短信时返回的验证值，登录时需要
                computedTime: 0, //倒数记时
                userInfo: null, //获取到的用户信息
                userAccount: null, //用户名
                passWord: null, //密码
                captchaCodeImg: null, //验证码地址
                codeNumber: null, //验证码
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
            }
        },
        components: {
            headerTop
        },
        methods: {
            changePassWordType() {
                this.showPassword = !this.showPassword;
            }
        }
    }
</script>

<style lang="less">
    .login-container {
        height: 100%;
        width: 100%;
        .login_form {
            padding-top: 50px;
            .input_container {
                position: relative;
                border: 1px solid #f3f3f3;
                input {
                    width: 100%;
                    height: 45px;
                    border: 0px;
                    outline: none;
                    padding-left: 10px;
                }
                .button_switch {
                    position: absolute;
                    top: 12px;
                    right: 15px;
                    border: 1px solid #f3f3f3;
                    border-radius: 15px;
                    padding: 3px 10px;
                    .circle_button {
                        position: absolute;
                        height: 29px;
                        width: 29px;
                        border-radius: 50%;
                        background: #eeeeee;
                        left: 0px;
                        top: -1px;
                        transition: all .3s;
                        z-index: 1;
                        box-shadow: 0 0.02667rem 0.05333rem 0 rgba(0, 0, 0, .1);
                    }
                    .trans_to_right {

                    }
                }
            }
        }
    }
</style>