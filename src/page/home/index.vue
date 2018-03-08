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
        }
    }
</script>

<style type="less">
    .name {
        color: orangered;
    }
</style>