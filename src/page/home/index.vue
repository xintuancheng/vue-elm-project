<template>
    <section class="home">
        <header-top signin-up='home'>
            <span slot='logo' class="head_logo" @click="reload">ele.me</span>
        </header-top>
        <nav class="city_nav">
            <div class="city_tip">
                <span>当前定位城市：</span>
                <span>定位不准时，请在城市列表中选择</span>
            </div>
            <router-link :to="'/city/' + guessCityid" class="guess_city">
                <span>{{guessCity}}</span>
                <div class="arrow_right"></div>
            </router-link>
        </nav>
        <section id="hot_city_container">
            <div class="city_title">热门城市</div>
            <ul class="citylistul clear">
                <router-link tag="li" v-for="item in hotcity" :to="'/city/' + item.id" :key="item.id" class="ellipsis">
                    {{item.name}}
                </router-link>
            </ul>
        </section>
        <section class="group_city_container">
            <ul class="letter_classify">
                <li v-for="(value, key, index) in sortgroupcity" :key="key" class="letter_classify_li">
                    <div class="city_title">{{key}}
                        <span v-if="index == 0">（按字母排序）</span>
                    </div>
                    <ul class="groupcity_name_container citylistul clear">
                        <router-link tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id"
                                     class="ellipsis">
                            {{item.name}}
                        </router-link>
                    </ul>
                </li>
            </ul>
        </section>
    </section>
</template>

<script>
    import headerTop from '../../component/header';
    import {getCityBytype} from '../../service/index';
    import {getCitys} from '../../util/city';

    export default {
        data() {
            return {
                guessCity: '',   //当前城市
                guessCityid: '', //当前城市id
                hotcity: [],     //热门城市列表
                groupcity: {},   //所有城市列表
            }
        },
        mounted() {
            getCityBytype('guess').then((res) => {
                this.guessCity = res.data.name;
                this.guessCityid = res.data.id;
            });

            getCityBytype('hot').then((res) => {
                this.hotcity = res.data;
            });

            getCitys().then((res) => {
                this.groupcity = res;
            });
        },
        components: {
            headerTop
        },
        methods: {
            reload() {
                window.location.reload();
            }
        },
        computed: {
            sortgroupcity() {
                const sortObj = {};

                for (let i = 65; i <= 90; i++) {
                    let code = String.fromCharCode(i);
                    if (this.groupcity[code]) {
                        sortObj[code] = this.groupcity[code];
                    }
                }

                return sortObj;
            }
        }
    }
</script>

<style lang="less">
    .home {
        .head_logo {
            font-weight: 400;
            font-size: 16px;
            color: #fff;
            width: 30px;
            height: 40px;
            line-height: 40px;
            margin-left: 10px;
        }
        .city_nav {
            margin-top: 45px;
            background: #ffffff;
            .city_tip {
                padding: 5px 15px 0px;
                border-bottom: 1px solid #eeeeee;
                height: 30px;
                line-height: 30px;
                margin-bottom: 5px;
                span {
                    display: inline-block;
                    font-size: 12px;
                }
                span:nth-of-type(1) {
                    float: left;
                }
                span:nth-of-type(2) {
                    float: right;
                }
            }
            .guess_city {
                clear: both;
                display: block;
                text-decoration: none;
                height: 30px;
                line-height: 30px;
                span {
                    display: inline-block;
                    padding-left: 15px;
                    color: #3190e8;
                    font-size: 18px;
                }
                .arrow_right {
                    float: right;
                    display: inline-block;
                    margin-top: 7px;
                    margin-right: 15px;
                    width: 8px;
                    height: 8px;
                    border-right: 2px solid #999999;
                    border-bottom: 2px solid #999999;
                    transform: rotate(-45deg);
                }
            }
        }
        #hot_city_container {
            background: #ffffff;
            margin-bottom: 20px;
        }
        .group_city_container {
            .letter_classify {
                padding: 0px;
                margin: 0px;
                .letter_classify_li {
                    margin-bottom: 20px;
                    background-color: #ffffff;
                    border-bottom: 1px solid #e4e4e4;
                    list-style: none;
                    .city_title {

                    }
                    .groupcity_name_container {
                        li {
                            color: #333333;
                        }
                    }
                }
            }
        }

        .city_title {
            height: 40px;
            line-height: 40px;
            padding: 0px 15px;
            font-size: 15px;
            border-bottom: 1px solid #dddddd;
            margin-top: 10px;
            background: #ffffff;
        }

        .citylistul:after {
            content: '';
            display: block;
            clear: both;
            height: 0px;
        }

        .citylistul {
            padding: 0px;
            margin: 0px;
            li {
                font-size: 14px;
                background: #ffffff;
                list-style: none;
                float: left;
                width: 25%;
                height: 40px;
                line-height: 40px;
                text-align: center;
                color: #3190e8;
                border-bottom: 1px solid #e4e4e4;
                border-right: 1px solid #e4e4e4;
                box-sizing: border-box;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            /*li .ellipsis { !*超出部分加上省略号...*!*/
                /*text-overflow: ellipsis;*/
                /*white-space: nowrap;*/
                /*overflow: hidden;*/
            /*}*/
        }
    }
</style>