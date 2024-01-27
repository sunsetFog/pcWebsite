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
        <br/>
        <img src="./img/bd_living.png" class="living" />正在直播
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
}</style>
