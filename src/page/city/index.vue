<template>
    <div class="city_container">
        <header-top :headTitle="cityname" :goBack="true">
            <span slot='changecity' class="changecity_logo" @click="changecity">切换城市</span>
        </header-top>
        <form class="form-city" v-on:submit.prevent>
            <div class="input_container">
                <input type="search" placeholder="输入学校、商务楼、地址" v-model="keyword" name="city" required/>
            </div>
            <input type="submit" class="city_submit" @click="postpois" value="提交"/>
        </form>
        <section class="search_history_container">
            <h5 class="history_title" v-if="historytitle">搜索历史</h5>
            <div class="search_history_list">
                <ul class="getpois_ul">
                    <li v-for="(item, index) in placelist" @click="nextpage(index, item.geohash)" :key="index">
                        <p class="pois_name ellipsis">{{item.name}}</p>
                        <p class="pois_address ellipsis">{{item.address}}</p>
                    </li>
                </ul>
            </div>
            <footer v-if="historytitle && placelist.length" class="clear_all_history" @click="clearAll">清空所有</footer>
            <div class="search_none_place" v-if="placeNone">很抱歉！无搜索结果</div>
        </section>
    </div>
</template>

<script>
    import headerTop from '../../component/header';
    import {getCurrentCityByid, getPois} from '../../service/city';
    import {getStore, setStore} from '../../util/util';

    export default {
        mounted() {
            this.cityid = this.$route.params.cityid;

            //获取当前城市名字
            getCurrentCityByid(this.cityid).then((res) => {
                this.cityname = res.data.name;
            });
        },
        data() {
            return {
                keyword: '', // 搜索地址
                cityid: '', // 当前城市id
                cityname: '', // 当前城市名字
                placelist: [], // 搜索城市列表
                placeHistory: [], // 历史搜索记录
                historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
                placeNone: false, // 搜索无结果，显示提示信息
            }
        },
        components: {
            headerTop
        },
        methods: {
            changecity() {
                this.$router.go(-1);
            },
            async postpois() {
                let type = 'search';
                let keyword = this.keyword;
                let cityid = this.cityid;

                if (!keyword) {
                    return;
                }

                const res = await getPois(type, keyword, cityid);

                if (res.data.message) {
                    this.historytitle = true;
                } else {
                    this.historytitle = false;
                    this.placelist = res.data;
                }
            },
            /**
             * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
             * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
             */
            nextpage(index, geohash) {
                let history = getStore('placeHistory');

                let currentPlace = this.placelist[index];

                if (history) {
                    let historyObj = JSON.parse(history);

                    const isRepeat = historyObj.some((item) => {
                        return item.geohash === geohash;
                    });

                    if (!isRepeat) {
                        this.placelist.push(currentPlace);
                    }
                } else {
                    this.placelist.push(currentPlace);
                }

                setStore('placeHistory', this.placelist);
                this.$router.push({path: '/msite', query: {geohash}});
            },
            clearAll() {

            }
        }
    }
</script>

<style lang="less">
    .city_container {
        .changecity_logo {
            position: absolute;
            top: 10px;
            right: 10px;
            color: #ffffff;
            font-size: 14px;
        }
        .form-city {
            margin-top: 50px;
            background: #ffffff;
            padding-bottom: 10px;
            .input_container {
                padding: 15px 0px;
                input {
                    display: block;
                    border: 1px solid #dddddd;
                    outline: none;
                    height: 35px;
                    width: 90%;
                    padding: 0px 15px;
                    border-radius: 5px;
                    margin: 0px auto;
                    box-sizing: border-box;
                }
            }
            .city_submit {
                display: block;
                width: 90%;
                height: 35px;
                line-height: 35px;
                background: #3190e8;
                text-align: center;
                color: #ffffff;
                border-radius: 5px;
                margin: 0 auto;
                outline: none;
                border: none;
            }
        }
        .search_history_container {
            .history_title {
                margin: 10px 0px;
                padding: 0px 10px 10px;
                color: #666666;
                border-bottom: 1px solid #dddddd;
            }
            .search_history_list {
                .getpois_ul {
                    padding: 0px;
                    background: #ffffff;
                    li {
                        display: block;
                        padding: 20px;
                        list-style: none;
                        border-bottom: 1px solid #dddddd;
                        p {
                            padding: 0px;
                            margin: 0px;
                            font-size: 14px;
                        }
                        .pois_name {
                            margin-bottom: 4px;
                        }
                        .pois_address {
                            font-size: 12px;
                            color: #999999;
                        }
                    }
                }
            }
        }
    }
</style>