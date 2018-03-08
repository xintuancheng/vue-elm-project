<template>
    <div class="city">
        <div class="name">{{name}}</div>
        <div class="age">{{age}}</div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                name: 'zhangsan',
                age: 23
            }
        }
    }
</script>

<style type="less">
    .name {
        color: orangered;
    }
</style>