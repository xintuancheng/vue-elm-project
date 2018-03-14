<template>
    <header id="header-top">
        <slot name='logo'></slot>
        <slot name='search'></slot>
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
        </section>
        <router-link :to="userInfo? '/profile':'/login'" v-if='signinUp' class="head_login">
            <svg class="user_avatar" v-if="userInfo">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
            </svg>
            <span class="login_span" v-else>登录|注册</span>
        </router-link>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
        <slot name="edit"></slot>
        <slot name="msite-title"></slot>
        <slot name="changecity"></slot>
        <slot name="changeLogin"></slot>
    </header>
</template>

<script>
    import {mapActions, mapState} from 'vuex';

    export default {
        mounted() {
            // 获取用户信息
            this.getUserInfo();
        },
        data() {
            return {};
        },
        computed: {
            ...mapState(['userInfo'])
        },
        props: ['signinUp', 'headTitle', 'goBack'],
        methods: {
            ...mapActions(['getUserInfo'])
        }
    }
</script>

<style lang="less">
    #header-top {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 40px;
        background: #3190e8;
        .head_goback {
            position: absolute;
            left: 5px;
            top: 10px;
            width: 60px;
            height: 40px;
            line-height: 40px;
            float: left;
        }
        .title_head {
            text-align: center;
            line-height: 40px;
            .title_text {
                font-size: 16px;
                color: #ffffff;
            }
        }
        .head_login {
            right: .55rem;
            font-size: .65rem;
            color: #fff;
            position: absolute;
            top: 50%;
            -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
            .user_avatar {
                fill: #fff;
                width: .8rem;
                height: .8rem;
            }

        }
    }
</style>