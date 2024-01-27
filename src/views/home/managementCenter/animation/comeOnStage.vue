<template>
    <section id="comeOnStage">
        <LineTextLine>平移和放大</LineTextLine>
        <header>
            <button :class="{ 'is-active': isActive == 0 }" @click="isActive = 0">花香电竞</button>
            <button :class="{ 'is-active': isActive == 1 }" @click="isActive = 1">开心电竞</button>
        </header>
        <main v-if="isActive == 0">
            <div class="box-left">
                <label>以客为尊 用心感受</label>
                <p>盘内提供英雄时时乐独特玩法，激情不间断，比赛之余小憩更精彩</p>
            </div>
            <div class="box-right">
                <img src="@sky/rafaelDesign/static/picture/breezy/electronic01.png" />
            </div>
        </main>
        <main v-if="isActive == 1">
            <div class="box-left">
                <label>以客为尊 用心感受</label>
                <p>盘内提供英雄时时乐独特玩法，激情不间断，比赛之余小憩更精彩</p>
            </div>
            <div class="box-right">
                <img src="@sky/rafaelDesign/static/picture/breezy/electronic02.png" />
            </div>
        </main>
        <LineTextLine>三秒后消失</LineTextLine>
        <el-button @click="play = !play">开始动画{{play}}</el-button>
        <span class="cartoon" v-if="play">+1</span>
        <LineTextLine>水波纹</LineTextLine>
        <button class="cabbage" @click="drawWay">
            水波纹
            <div id="birdApt" class=""></div>
        </button>
    </section>
</template>

<script>
export default {
    data() {
        return {
            isActive: 0,
            play: false
        }
    },
    methods: {
        drawWay() {
            let birdApt = document.getElementById('birdApt');
            birdApt.className = 'activeWater'
            setTimeout(()=>{
                birdApt.className = ''
            }, 450)
        }
    }
}
</script>

<style lang="less" scoped>
#comeOnStage {
    header {
        button {
            width: 148px;
            height: 52px;
            padding: 0 0 7px 0;
            background: none;
            box-sizing: border-box;
            background-image: url('~@sky/rafaelDesign/static/picture/breezy/btn01.png');
            background-size: 100% 100%;
            background-repeat: no-repeat;
            color: #3f5075;
        }

        button:nth-of-type(1) {
            margin-right: 15px;
        }

        .is-active {
            color: #fff !important;
            background-image: url('~@sky/rafaelDesign/static/picture/breezy/btn02.png') !important;
            background-size: 100% 100%;
            background-repeat: no-repeat;
        }
    }

    main {
        width: 100%;
        height: 600px;

        .box-left {
            width: calc(100% - 728px);
            height: 100%;
            float: left;
            animation: content-animation 0.5s ease-in-out;

            label {
                font-size: 16px;
                font-weight: 600;
                color: rgba(0, 0, 0, .85);
            }

            p {
                font-size: 14px;
                color: #3f5075;
                color: #fff;
            }
        }

        @keyframes content-animation {
            0% {
                margin-left: -100px;
                opacity: 0;
            }

            100% {
                margin-left: 0;
                opacity: 1;
            }
        }

        .box-right {
            width: 728px;
            height: 100%;
            float: right;

            img {
                width: 100%;
                height: 100%;
                animation: scale-animation 0.5s ease-out;
            }

            @keyframes scale-animation {
                0% {
                    opacity: 0;
                    transform: scale(0);
                }

                100% {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        }
    }

    @keyframes overturn {
        0% {
            opacity: 1;
        }

        60% {
            opacity: 1;
        }

        100% {
            opacity: 0;
        }
    }
    .cartoon {
        opacity: 0;
        animation: overturn 3s linear;
    }
    .cabbage {
        width: fit-content;
        height: 30px;
        padding: 0px 16px;
        border-radius: 4px;
        background: var(--Text-primary-500, #179CFF);
        color: var(--text-white-100, #FFF);
        box-shadow: 0 2px 0 rgba(5, 145, 255, 0.1);
        font-family: "PingFang SC";
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        position: relative;
        div {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #179CFF;
            border-radius: 4px;
            opacity: 0.5;
            visibility: hidden;
            // transform: scale(1.2);

            // width: calc(100% + 20px);
            // height: calc(100% + 20px);
            // transform: translate(-10px, -10px);
        }
        .activeWater {
            animation: pumpkin 0.45s ease-in-out;
            animation-fill-mode: both;
            visibility: visible;
            // opacity: 0.5;
        }
    }
    @keyframes pumpkin {
        0% {
            width: 100%;
            height: 100%;
            // transform: scale(1);
            opacity: 0.5;
        }
        100% {
            width: calc(100% + 20px);
            height: calc(100% + 20px);
            transform: translate(-10px, -10px);
            // transform: scale(1.2);
            opacity: 0;
        }
    }
}</style>
