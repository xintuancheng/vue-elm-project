<template>
    <div class="city_container">
        <header-top :headTitle="cityname" :goBack="true">
            <span slot='changecity' class="changecity_logo" @click="changecity">切换城市</span>
        </header-top>
        <section class="form-city">
            <div class="input_container">
                <input type="text" placeholder="输入学校、商务楼、地址" @enter="searchCity"/>
            </div>
            <div class="city_submit">提交</div>
        </section>
    </div>
</template>

<script>
    import headerTop from '../../component/header';
    import {getCurrentCityByid} from '../../service/city';

    export default {
        mounted() {
            this.cityid = this.$router.params.cityid;

            //获取当前城市名字
            getCurrentCityByid(this.cityid).then((res) => {
                this.cityname = res.data.name;
            });
        },
        data() {
            return {
                cityid: '', // 当前城市id
                cityname: '' // 当前城市名字
            }
        },
        components: {
            headerTop
        },
        methods: {
            changecity() {
                this.$router.go(-1);
            },
            searchCity() {

            }
        }
    }
</script>

<style lang="less">
    .city_container {

    }
</style>