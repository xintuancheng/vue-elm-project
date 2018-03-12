<template>
    <header id="header-top">
        <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
            </svg>
        </section>
        <section class="title_head ellipsis" v-if="headTitle">
            <span class="title_text">{{headTitle}}</span>
        </section>
    </header>
</template>

<script>
    import {mapActions} from 'vuex';

    export default {
        mounted() {
            // 获取用户信息
            this.getUserInfo();
        },
        data() {
            return {};
        },
        props: ['signinUp', 'headTitle', 'goBack'],
        methods: {
            ...mapActions(['getUserInfo'])
        }
    }
</script>

<style type="less">
    #header-top {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 60px;
        background: #3190e8;
        .head_goback {
            left: 40px;
            width: 60px;
            height: 40px;
            line-height: 40px;
        }
        .title_head {
            .title_text {
                text-align: center;
                font-size: 16px;
            }
        }
    }
</style>