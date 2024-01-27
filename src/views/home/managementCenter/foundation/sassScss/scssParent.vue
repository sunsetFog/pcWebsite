<template>
    <section id="scssParent">
        <LineTextLine>变量与字符串拼接</LineTextLine>
        <div class="cartoon">
            卡通<span class="invoices">人物</span>
        </div>
        <LineTextLine>运算，calc()函数scss变量</LineTextLine>
        <div class="cakes"></div>
        <LineTextLine>@extend继承</LineTextLine>
        <div class="circle1">渊源</div>
        <LineTextLine>@mixin混入</LineTextLine>
        <div class="honey1">春天</div>
        <LineTextLine>函数</LineTextLine>
        <div class="summer1">夏天</div>
        <LineTextLine>@if条件语句</LineTextLine>
        <div class="butterfly">蝴蝶</div>
        <LineTextLine>遍历</LineTextLine>
        <div class="swan">
            <div class="card-1 ice-1s peach1-success">春</div>
            <div class="card-2 ice-2s peach1-error">夏</div>
            <div class="card-3 ice-3s peach2-success">秋</div>
            <div class="card-4 ice-4s peach2-error">冬</div>
        </div>
        <LineTextLine>作用域，修改子组件样式</LineTextLine>
        <scssSon></scssSon>
    </section>
</template>

<script>
/*
    scss官网：https://www.sass.hk/guide/

    如何在VUE项目中使用SCSS: https://www.jianshu.com/p/2823f27f9dd7

    npm install node-sass sass-loader -D       注意版本报错
    {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
    }

    在vue项目全局中引入scss----因为main.js文件加载不了less/scss文件，只能加载css文件
    npm install sass-resources-loader --save-dev
    build\utils.js 配置
    将
    scss: generateLoaders('sass')
    修改为
    scss: generateLoaders('sass').concat({
      loader: 'sass-resources-loader',
      options: {
        resources: path.resolve(__dirname, '../static/capital/variable.scss') // 记得修改文件路径
      }
    })

*/
import scssSon from './scssSon'
export default {
    name: 'scssParent',
    components: { scssSon }
}
</script>

<style lang="scss" scoped>
// 嵌套


$text-color: red;



$path: '~@sky/rafaelDesign/static/image1/';
$bean: 'invoice';
// 模板字符串语法(反引号``)在 scss 中是无效的
.cartoon {
    width: 80px;
    height: 80px;
    background-image: url("#{$path}#{$bean}.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    .#{$bean}s {
        color: brown !important;
    }
}

// 运算
$div-width: 150px;
.cakes {
    width: 100%;
    height: calc(#{$div-width} - 20px);
    border: 1px solid #{$text-color};
}

// 继承
.circle2 {
    font-size: 22px;
}
.circle1 {
    @extend .circle2;
}

// mixin
@mixin honey2($height) {
    height: $height;
}
.honey1 {
    width: 80px;
    @include honey2(80px);
}


/* 自定义函数  */
@function summer2($n) {
    @return $n*2
}
.summer1 {
    width: summer2(50px);
    height: 80px;
}

// if 条件语句
$condition: "condition";
$show: true;
.butterfly {
    width: 80px;
    height: 80px;
    @if ($condition == 'condition') {
        background: #00BCD4;
    } @else if ($condition == 'condition6') {
        background: yellowgreen;
    } @else {
        background: rebeccapurple;
    }
    // 三元条件表达式 --- 用不了
    // color: $show ? 'red' : 'blue';
}

// 遍历的用法
.swan {
    // @for 循环次数，留首不留尾，此时有1，2，3，4
    // 方式1
    // @for $i from 1 to 5 {
    // 方式2
    @for $i from 1 through 5 {
        .card-#{$i} {
            width: 100%;
            background: brown;
            margin-top: 10px;
        }
    }
    // @each 遍历列表
    $cabbage: 1s 2s 3s 4s;
    // 方式1
    @each $item in $cabbage {
    // 方式2
    // @each $item in 1s, 2s, 3s, 4s {
        .ice-#{$item} {
            color: yellowgreen;
        }
    }
    // @each 遍历Map
    $icons: (
        success: 35px,
        error: 25px
    );
    @each $key, $value in $icons {
        .peach1-#{$key} {
            height: $value;
        }
    }
    // @for 遍历Map
    @for $i from 1 to length($icons) {
        .peach2-#{nth(map-keys($icons), $i)} {
            height: nth(map-values($icons), $i);
        }
    }
}

// 作用域，修改子组件样式
#scssParent {
    /*
        如何跳过组件scoped样式模块化?
            方式一  /deep/深度选择器，一般与!important一起用
                用来穿透 shadow DOM 的样式封装,修改 shadow DOM 组件内部的样式
            方式二  :global，一般与!important一起用
                用于定义全局样式, 不会受 scoped 样式影响

            优先级/deep/ 大于 :global

            出现报错：TypeError: Cannot set property 'parent' of undefined
            原因: :global {}   :deep {}写法不支持
            解决: 换写法 :global(.scssSon) {}    :deep(.scssSon) {}
    */
    :deep(.exit-login) {
        color: rebeccapurple !important;
    }
    :deep(.scssSon) {
        color: indianred !important;
    }

    :global(.exit-login) {
        color: yellowgreen !important;
    }
    :global(.scssSon) {
        color: chartreuse !important;
    }
}
</style>
