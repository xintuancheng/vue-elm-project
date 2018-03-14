<template>
    <div>
        <section class="toast_container">
            <section class="tip_text_container">
                <div class="toast_icon">
                    <span></span>
                    <span></span>
                </div>
                <p class="toast_text">{{alertText}}</p>
                <div class="toast_confirm" @click="closeToast">确定</div>
            </section>
        </section>
        <section class="toast_mask_container"></section>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        props: ['alertText', 'showHide'],
        methods: {
            closeToast() {
                this.$emit('closeToast');
            }
        }
    }
</script>

<style lang="less">
    .toast_container {
        position: relative;
        width: 100%;
        z-index: 201;
        .tip_text_container {
            width: 300px;
            margin: 20px auto 0px;
            border-radius: 8px;
            overflow: hidden;
            background: #ffffff;
            .toast_icon {
                position: relative;
                width: 70px;
                height: 70px;
                border-radius: 50%;
                border: 3px solid #f8cb86;
                margin: 20px auto 15px;
                span {
                    display: block;
                }
                span:nth-of-type(1) {
                    width: 3px;
                    height: 40px;
                    background-color: #f8cb86;
                    margin-top: 10px;
                    margin-left: 33px;
                }
                span:nth-of-type(2) {
                    width: 6px;
                    height: 6px;
                    border: 1px;
                    border-radius: 50%;
                    background-color: #f8cb86;
                    margin-left: 32px;
                    margin-top: 5px;
                }
            }
            .toast_text {
                text-align: center;
                font-size: 14px;
            }
            .toast_confirm {
                text-align: center;
                height: 40px;
                line-height: 40px;
                background: #4cd964;
                color: #ffffff;
                font-size: 16px;
            }
        }
    }

    .toast_mask_container {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 200;
        background: rgba(0, 0, 0, .1);
    }
</style>