<template>
    <section id="css-demo">
        <LineTextLine>三角框框</LineTextLine>
        <div class="container">
            <div class="luminescence">
                <div class="triangle"></div>
            </div>
        </div>
        <LineTextLine>好看的滚动条</LineTextLine>
        <div class="scroll-box">
            <el-scrollbar style="width:100%;height:100%;">
                <ul>
                    <li v-for="(item,index) in 20" :key="index">{{item}}</li>
                </ul>
            </el-scrollbar>
        </div>
        <LineTextLine>清除浮动，父盒子才能撑开高度，margin-top就不会失效</LineTextLine>
        <!--
            解决办法1：在最后一个li元素后面加上<div style="clear: both;"></div>
            解决办法2：父级元素加样式overflow: hidden;
            解决办法3：li元素加样式display:inline-block;
         -->
        <div class="pen-float">
            <li v-for="(item,index) in ['a','b','c','d','e']"></li>
            <!-- 第一种 -->
            <!-- <div style="clear: both;"></div> -->
        </div>
        <LineTextLine>px,rem,em</LineTextLine>
        <!--
            px相对屏幕分辨率  固定单位
            em相对父元素font-size： 1em=(父元素font-size)px   默认值16px  4em*(父元素font-size)=？px
            rem相对html的font-size: 1rem=(html的font-size)px  默认值16px  4rem*(html的font-size)=？px
         -->
        <div class="pen-cat">
            <div></div>
        </div>
        <LineTextLine>按钮背景</LineTextLine>
        <div class="swan">
            <button></button>
        </div>
        <LineTextLine>float测试</LineTextLine>
        <div class="klxlls">
            <div class="yi"></div>
            <div class="er"></div>
            <div class="san"></div>
            <div class="si"></div>
        </div>
        <LineTextLine>带背景图的盒子拉伸，一个盒子三张背景图</LineTextLine>
        <main class="cardItemView">

        </main>
        <LineTextLine>清空当前选择器的所有样式</LineTextLine>
        <button class="reset">重置样式</button>
        <LineTextLine>禁用鼠标事件</LineTextLine>
        <div class="rainbow">
            <button>哈喽哇</button>
        </div>
        <LineTextLine>display: inline-block;底部占据了一点高度，因为默认对齐方式是基线对齐</LineTextLine>
        <p class="cabbage">
            <span>
                display: inline-block;底部占据了一点高度
            </span>
        </p>
    </section>
</template>

<script>
export default {
    name: 'cssDemo'
}
</script>

<style lang="less" scoped>
#css-demo {
    color: #fff;
    .container {
        width: 400px;
        position: relative;
        .luminescence {
            width: 400px;
            height: 100px;
            border: 1px solid #C9CACB;
            box-shadow: 1px 1px 10px 0 #C9CACB; // 阴影
            background: #586B8D;
            position: relative;
            .triangle {
                width: 10px;
                height: 10px;
                border-left: 1px solid #C9CACB;
                border-top: 1px solid #bbbbbb;
                background: #586B8D;
                transform: rotate(45deg);
                -webkit-transform: rotate(45deg); // 旋转角度
                -moz-transform: rotate(45deg);
                -ms-transform: rotate(45deg);
                -o-transform: rotate(45deg);
                position: absolute;
                left: 22px;
                top: -5px;
                z-index: 2;
            }
        }
    }

    .scroll-box {
        width: 300px;
        height: 200px;
        border: 1px solid #1685B0;
        background: rgba(22,133,176,0.4);
        margin-top: 20px;
        ul {
            li {
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
                color: #fff;
            }
        }
        :deep(.el-scrollbar__wrap) {
            overflow-x: hidden;
        }
    }

    .pen-float {
        width: 100%;
        -height: 100px; // 别写死高度，因为li元素数量是动态的，数量不限
        overflow: hidden; // 第二种给父元素这个
        background: #F0F3F5;
        li {
            width: 48%;
            height: 50px;
            border-radius: 5px;
            background: #FFFFFF;
            list-style: none;
        }
        li:nth-child(n + 3) {
            margin-top: 6px;
        }
        li:nth-of-type(odd) { // 奇数行
            float: left;
        }
        li:nth-of-type(even) { // 偶数行
            float: right;
        }
    }
    .pen-cat {
        width: 100px;
        height: 100px;
        font-size: 12px;
        background: slateblue;
        div {
            width: 4em;// 1em = 12px   4*12=48
            height: 100px;
            background: snow;
        }
    }
    .swan {
        width: 100%;
        padding: 35px 0;
        background: #fff;
        button {
            .mixin_back_btn();
        }
    }
    .klxlls {
        width: 100%;
        height: 200px;
        .yi {
            width: 120px;
            height: 120px;
            float: left;
            background: red;
        }
        .er, .san {
            width: calc(100% - 120px);
            height: 60px;
            float: left;
            background: yellowgreen;
        }
        .san {
            background: yellow;
        }
        .si {
            width: calc(100% - 120px);
            height: 60px;
            float: left;
            background: brown;
        }
    }
    @topheight: calc(54px * 2.5);
    @bottomheight: calc(60px * 2.5);
    .cardItemView {
        width: 390px;
        min-height: 500px;
        background-repeat: no-repeat, no-repeat, no-repeat;
        background-size: 100% @topheight, 100% calc(100% - @topheight - @bottomheight + 4px), 100% @bottomheight;
        background-position: left top, left calc(@topheight - 2px), left bottom;
        background-image: url('./img/title_bg_top.png'), url('./img/title_bg_main.png'), url('./img/title_bg_bottom.png');
    }
    .reset {
        all: unset;// 单项重置: color: unset;
    }
    .rainbow {
        width: 100%;
        height: 45px;
        background: #586B8D;
        pointer-events: none;// 禁用鼠标事件
        cursor: pointer;// 鼠标选择手掌
        button {
            float: right;
            padding: 4px 10px;
            cursor: pointer;// 鼠标选择手掌
            pointer-events: auto;// 开启鼠标事件
        }
    }
    .cabbage {
        width: 100%;
        background: #586B8D;
        span {
            display: inline-block;// 现在问题不出现了？？
            vertical-align: top;// 垂直对齐方式
            background: yellowgreen;
        }
    }
}
</style>
