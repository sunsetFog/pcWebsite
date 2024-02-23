<template>
    <section>
        <LineTextLine>无缝连接向上滚动</LineTextLine>
        九宫格抽奖1
        <br />
        位置：news\src\reportForms\pages\luckDraw\upAndDown.vue
        <LineTextLine>上下移动</LineTextLine>
        <img class="sendOut" src="@sky/rafaelDesign/static/picture/breezy/sendOut.png" />
        <LineTextLine>水波</LineTextLine>
        <div class="ripple">
            <img src="@sky/rafaelDesign/static/picture/breezy/1.png" />
            <img src="@sky/rafaelDesign/static/picture/breezy/2.png" />
        </div>
        <LineTextLine>旋转</LineTextLine>
        <div class="runaround">
            <img src="@sky/rafaelDesign/static/picture/breezy/logo192.png" />
        </div>
        <LineTextLine>一闪一闪亮晶晶</LineTextLine>
        <div class="honey">
            <div class="leftBox">
                <div class="prePage"></div>
            </div>
            <div class="rightBox">
                <div class="nextPage"></div>
            </div>
        </div>
        <br />
        <img src="./img/bd_living.png" class="living" />正在直播
        <LineTextLine>边框</LineTextLine>
        <button class="autumn">
            <div class="ice"></div>
            <span>专业</span>
            <div class="draw"></div>
        </button>
        <LineTextLine>摇晃</LineTextLine>
        <div class="cabbage">
            <img src="./img/gift.png" />
        </div>
    </section>
</template>

<script>
</script>

<style lang="less" scoped>
section {
    .sendOut {
        width: 70px;
        height: 70px;
        animation: joyous 2s linear infinite alternate;
    }

    @keyframes joyous {
        from {
            transform: translate3d(0, 0, 0);
        }

        to {
            transform: translate3d(0, 20px, 0);
        }
    }

    .ripple {
        width: 90px;
        height: 90px;
        margin: 0 auto;
        position: relative;

        img:nth-of-type(1) {
            width: 100%;
            height: 100%;
            opacity: 0.5;
            animation: heart-animate 2s linear infinite;
            position: absolute;
            left: 0px;
            top: 0px;
            z-index: 1;
        }

        img:nth-of-type(2) {
            width: 100%;
            height: 100%;
            opacity: 0.5;
            animation: heart-animate 2s linear 0.3s infinite;
            position: absolute;
            left: 0px;
            top: 0px;
            z-index: 2;
        }

        @keyframes heart-animate {
            0% {
                opacity: 1;
                transform: scale(1);
            }

            15% {
                opacity: 0.5;
                transform: scale(1.25);
            }

            30% {
                opacity: 0;
                transform: scale(1.5);
            }

            100% {
                opacity: 0;
                transform: scale(1);
            }
        }
    }

    .runaround {
        width: 90px;
        height: 90px;

        img {
            width: 100%;
            height: 100%;
            animation: App-logo-spin infinite 20s linear;
        }

        @keyframes App-logo-spin {
            from {
                transform: rotate(0deg);
            }

            to {
                transform: rotate(360deg);
            }
        }
    }

    .honey {
        width: 100%;
        height: 250px;

        .leftBox {
            width: 45px;
            height: 100%;
            float: left;
            display: flex;
            justify-content: center;
            align-items: center;

            .prePage {
                width: 36px;
                height: 36px;
                background: url('./img/left_unsele.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                animation: flash 1s linear infinite;

                &:hover {
                    background: url('./img/left_sele.png');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
            }
        }

        .rightBox {
            width: 45px;
            height: 100%;
            float: right;
            display: flex;
            justify-content: center;
            align-items: center;

            .nextPage {
                width: 36px;
                height: 36px;
                background: url('./img/right_unsele.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                animation: flash 1s linear infinite;

                &:hover {
                    background: url('./img/right_sele.png');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                }
            }
        }

        @keyframes flash {
            0% {
                opacity: 1;
            }

            50% {
                opacity: 0;
            }

            100% {
                opacity: 1;
            }
        }
    }

    .living {
        animation: flash 1s linear infinite;
    }

    .autumn {
        margin-left: 200px;
        padding: 2px 11px;
        border-radius: 12px;
        background: #fff;
        overflow: hidden;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
            color: #179CFF;
            font-size: 12px;
            position: relative;
            z-index: 3;
        }

        .ice {
            position: absolute;
            left: 1px;
            top: 1px;
            right: 1px;
            bottom: 1px;
            background-color: #fff;
            z-index: 2;
            border-radius: 12px;
        }

        .draw {
            position: absolute;
            z-index: 1;
            width: 200%;
            padding-bottom: 200%;
            background: conic-gradient(at center, transparent, #45b0ff 30%, transparent 30%);
            animation: dragonfly 1s linear infinite;
        }

        @keyframes dragonfly {
            100% {
                transform: rotate(360deg);
            }
        }
    }

    .cabbage {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        img {
            width: 44px;
            position: absolute;
            animation-name: upAnimation;
            transform-origin: center bottom;
            animation-duration: 2s;
            animation-fill-mode: both;
            animation-iteration-count: infinite;
            animation-delay: 0.5s;
        }

        @keyframes upAnimation {
            0% {
                transform: rotate(0deg);
                transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }

            10% {
                transform: rotate(-10deg);
                transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }

            20% {
                transform: rotate(10deg);
                transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }

            28% {
                transform: rotate(-8deg);
                transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }

            36% {
                transform: rotate(8deg);
                transition-timing-function: cubic-bezier(0.755, 0.5, 0.855, 0.06);
            }

            42% {
                transform: rotate(-6deg);
                transition-timing-function: cubic-bezier(0.755, 0.5, 0.855, 0.06);
            }

            48% {
                transform: rotate(6deg);
                transition-timing-function: cubic-bezier(0.755, 0.5, 0.855, 0.06);
            }

            52% {
                transform: rotate(-4deg);
                transition-timing-function: cubic-bezier(0.755, 0.5, 0.855, 0.06);
            }

            56% {
                transform: rotate(4deg);
                transition-timing-function: cubic-bezier(0.755, 0.5, 0.855, 0.06);
            }

            60% {
                transform: rotate(0deg);
                transition-timing-function: cubic-bezier(0.755, 0.5, 0.855, 0.06);
            }

            100% {
                transform: rotate(0deg);
                transition-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
            }
        }
    }
}</style>
