<template>
    <div id="app">
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    // import bus from './helper'
    export default {
        data() {
            return {
            }
        },
        methods: {
        },
        mounted() {
        }
    }
</script>

<style scoped lang="less">
    #app {
        display: flex;
        flex-direction: column;
    }

    .main {
        flex: 1;
        overflow-y: auto;
    }

    .tab-list {
        position: relative;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        background: #eee;
        height: 90px;
        line-height: 90px;
        font-size: 24px; /*no*/

        .tab-item {
            color: #000;

            &.router-link-exact-active {
                color: rgb(25, 212, 25);
            }

            &.box {
                width: 60px;
                height: 60px;
                line-height: 60px;
                text-align: center;
                border-radius: 15px;
                background: skyblue;
            }
        }
    }

    .ball {
        position: fixed;
        transition: all .5s cubic-bezier(0.46, -0.13, 0.86, 0.00);
        width: 50px;
        height: 50px;
        background: rgba(0, 0, 0, 0);
        z-index: 99;

        .inner {
            transition: all .5s linear;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: skyblue;
        }
    }
</style>
