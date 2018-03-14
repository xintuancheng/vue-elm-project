<template>
    <div class="login-container">
        <header-top :headTitle="'登陆'" :goBack="true"></header-top>
        <form class="login_form">
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
            <section class="input_container captcha_code_container">
                <input type="text" placeholder="验证码" v-model="codeNumber" maxlength="4"/>
                <div class="img_change_img">
                    <img v-show="captchaCodeImg" :src="captchaCodeImg"/>
                    <div class="change_img" @click="getCaptchaCode">
                        <p>看不清</p>
                        <p>换一张</p>
                    </div>
                </div>
            </section>
            <section class="submit_btn">
                <input type="button" value="登陆" @click="mobileLogin"/>
            </section>
        </form>
        <toast v-if="showAlert" :showHide="showAlert" @closeToast="closeToast" :alertText="alertText"></toast>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import headerTop from '../../component/header';
    import Toast from '../../component/toast';
    import {accountLogin, getCaptchas} from '../../service/index';

    export default {
        created() {
            this.getCaptchaCode();
        },
        data() {
            return {
                showPassword: false, // 是否显示密码
                userInfo: null, //获取到的用户信息
                userAccount: null, //用户名
                passWord: null, //密码
                captchaCodeImg: null, //验证码地址(图片)
                codeNumber: null, //验证码
                showAlert: false, //显示提示组件
                alertText: null, //提示的内容
            }
        },
        components: {
            headerTop,
            Toast
        },
        methods: {
            ...mapMutations(['RECORD_USERINFO']),

            //获取验证吗，线上环境使用固定的图片，生产环境使用真实的验证码
            async getCaptchaCode() {
                const res = await getCaptchas();

                this.captchaCodeImg = res.data.code;
            },
            async mobileLogin() {
                if (!this.userAccount) {
                    this.showAlert = true;
                    this.alertText = '请输入手机号/邮箱/用户名';
                    return;
                } else if (!this.passWord) {
                    this.showAlert = true;
                    this.alertText = '请输入密码';
                    return;
                } else if (!this.codeNumber) {
                    this.showAlert = true;
                    this.alertText = '请输入验证码';
                    return;
                }

                // 用户名登陆
                const res = await accountLogin(this.userAccount, this.passWord, this.codeNumber);
                this.userInfo = res.data;

                //如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
                if (!this.userInfo.user_id) {
                    this.showAlert = true;
                    this.alertText = this.userInfo.message;
                    this.getCaptchaCode();
                } else {
                    this.RECORD_USERINFO(this.userInfo);
                    this.$router.go(-1);
                }

            },
            changePassWordType() {
                this.showPassword = !this.showPassword;
            },
            closeToast() {
                this.showAlert = false;
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
                    font-size: 15px;
                }
                .button_switch {
                    position: absolute;
                    top: 12px;
                    right: 15px;
                    border: 1px solid #f3f3f3;
                    border-radius: 15px;
                    padding: 3px 7px;
                    height: 12px;
                    line-height: 12px;
                    color: #ffffff;
                    background: #cccccc;
                    .circle_button {
                        position: absolute;
                        height: 29px;
                        width: 29px;
                        border-radius: 50%;
                        background: #f1f1f1;
                        left: 0px;
                        top: -5px;
                        transition: all 1s;
                        z-index: 1;
                        box-shadow: 0 0.02667rem 0.05333rem 0 rgba(0, 0, 0, .1);
                    }
                    .trans_to_right {
                        right: 0px !important;
                        left: auto;
                        transition: all 1s;
                    }
                }
                .change_to_text {
                    background: #4cd964;
                }
            }
            .captcha_code_container {
                .img_change_img {
                    position: absolute;
                    right: 15px;
                    top: 3px;
                    img {
                        margin-right: 10px;
                    }
                    .change_img {
                        display: inline-block;
                        p {
                            padding: 0px;
                            margin: 0px;
                            font-size: 14px;
                            color: #666666;
                        }
                        p:nth-of-type(2) {
                            color: #3b95e9;
                        }
                    }
                }
            }
            .submit_btn {
                text-align: center;
                margin-top: 10px;
                input {
                    outline: none;
                    border: none;
                    width: 90%;
                    height: 40px;
                    line-height: 40px;
                    border-radius: 5px;
                    background: #4cd964;
                    color: #ffffff;
                    font-size: 16px;
                }
            }
        }
    }
</style>