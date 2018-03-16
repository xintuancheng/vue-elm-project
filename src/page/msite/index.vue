<template>
    <div class="msite">
        <header-top signin-up="msite">
            <router-link :to="'/search/geohash'" class="link_search" slot="search">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
                    <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
                </svg>
            </router-link>
            <router-link to="/home" slot="msite-title" class="msite_title">
                <span class="title_text ellipsis" :title="msiteTitle">{{msiteTitle}}</span>
            </router-link>
        </header-top>
        <nav class="msite_nav">
            <div class="swiper-container" v-if="foodTypes.length">
                <div class="swiper-wrapper">
                    <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
                        <router-link
                                :to="{path: '/food', query: {geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}"
                                v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
                            <img :src="imgBaseUrl + foodItem.image_url">
                            <span>{{foodItem.title}}</span>
                        </router-link>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
            </div>
            <img class="food_panel" src="../../resources/images/fl.svg" v-else/>
        </nav>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    import headerTop from '../../component/header';
    import {getCityBytype, msiteFoodTypes, getAddressByGeohash} from '../../service/index';

    export default {
        async beforeMount() {
            const geohash = this.$route.query.geohash;

            if (!geohash) {
                const address = await getCityBytype('guess');
                this.geohash = address.latitude + ',' + address.longitude;
            } else {
                this.geohash = geohash;
            }

            //保存geohash 到vuex
            this.SAVE_GEOHASH(this.geohash);

            let res = await getAddressByGeohash(this.geohash);

            this.msiteTitle = res.data.name;

            this.RECORD_ADDRESS(res.data);
            this.hasGetData = true;
        },
        mounted() {
            //获取导航食品类型列表
            msiteFoodTypes(this.geohash).then((res) => {
                const data = res.data;
                let length = data.length; // 返回一个新的数组
                let resArr = [...data];
                let foodArr = []; //二维数组, 每一组数据就是一个跑马灯页面

                for (let i = 0, j = 0; i < length; i += 8, j++) {
                    foodArr[j] = resArr.splice(0, 8);
                }

                this.foodTypes = foodArr;
            }).then(() => {
                //初始化swiper
                new Swiper('.swiper-container', {
                    pagination: {
                        el: '.swiper-pagination',
                        type: 'bullets',
                    },
                    loop: true
                });
            });
        },
        data() {
            return {
                geohash: '', // city页面传递过来的地址geohash
                msiteTitle: '请选择地址...', // msite页面头部标题
                foodTypes: [], // 食品分类列表
                hasGetData: false, //是否已经获取地理位置数据，成功之后再获取商铺列表信息
                imgBaseUrl: 'https://fuss10.elemecdn.com', //图片域名地址
            }
        },
        components: {
            headerTop
        },
        methods: {
            ...mapMutations(['SAVE_GEOHASH', 'RECORD_ADDRESS']),
            // 解码url地址，求去restaurant_category_id值
            getCategoryId(url) {
                let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''));

                if (/restaurant_category_id/gi.test(urlData)) {
                    return JSON.parse(urlData).restaurant_category_id.id;
                } else {
                    return '';
                }
            }
        }
    }
</script>

<style lang="less">
    @import "./index.less";
</style>