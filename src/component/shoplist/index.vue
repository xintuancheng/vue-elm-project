<template>
    <div class="shoplist_container">
        <ul v-load-more="loaderMore"></ul>
    </div>
</template>

<script>

    export default {
        props: ['geohash'],
        methods: {
            async initData() {
                //获取数据
                let res;
            }
        }
    }
</script>

<style lang="less">
    @import "./shoplist.less";
</style>