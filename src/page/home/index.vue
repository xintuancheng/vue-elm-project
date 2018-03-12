<template>
    <div class="city">
        <div class="name">{{name}}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: 'home'
            }
        },
        mounted() {

        }
    }
</script>

<style lang="less">
    .name {
        color: orangered;
    }
</style>