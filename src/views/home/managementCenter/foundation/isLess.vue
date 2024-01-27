<template>
    <section id="isLess">
        <LineTextLine>变量</LineTextLine>
        <div class="cosplay">
            角色
        </div>
        <LineTextLine>变量与字符串拼接</LineTextLine>
        <div class="cartoon">
            卡通<span class="invoices">人物</span>
        </div>
        <LineTextLine>运算，calc()函数less变量</LineTextLine>
        <div class="cakes"></div>
        <LineTextLine>函数</LineTextLine>
        <div class="summer1">夏天</div>
        <LineTextLine>混入Mixins</LineTextLine>
        <div class="honey1">春天</div>
        <LineTextLine>映射</LineTextLine>
        <div class="fabulous">季节</div>
        <LineTextLine>命名空间和访问符</LineTextLine>
        <div class="dragonfly"><span class="milk">蜻蜓</span></div>
        <LineTextLine>@if条件语句</LineTextLine>
        <div class="butterfly">蝴蝶</div>
    </section>
</template>

<script>
/*
    less官网: https://less.bootcss.com/

    npm install less less-loader --save      注意版本报错

    build\webpack.base.conf.js  配置
    {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
    }


    在vue项目全局中引入less----因为main.js文件加载不了less/scss文件，只能加载css文件
    npm install sass-resources-loader --save-dev
    build\utils.js 配置
    将
    less: generateLoaders('less')
    修改为
    less: generateLoaders('less').concat({
      loader: 'sass-resources-loader',
      options: {
        resources: path.resolve(__dirname, '../static/capital/common.less') // 记得修改文件路径
      }
    })



    html文件引入： link引入less样式   或   script 引入less.js

    scoped 组件作用域，使组件样式互不影响
*/
export default {
    name: 'isLess',
    data() {
        return {
            rainbow: 'blue'
        }
    }
}
</script>

<style lang="less" scoped>
// 嵌套
@text-color: red;

@mkcolor1: #6ec5ff;
@bgColor: "mkcolor1";
.cosplay {
    width: 80px;
    height: 80px;
    color: @@bgColor;
    border: 1px solid @mkcolor1;
}

@path: '~@sky/rafaelDesign/static/image1/';
@bean: 'invoice';
// 模板字符串语法(反引号``)在 less 中是无效的
.cartoon {
    width: 80px;
    height: 80px;
    // color: ~"@{text-color}";
    // color: @@bgColor;
    background-image: ~"url(@{path}@{bean}.png)";
    // background-image: @"url(@{path}@{bean}.png)";
    background-size: 100% 100%;
    background-repeat: no-repeat;
    // 用不了
    .@{bean}s {
        color: brown !important;
    }
}

@div-width: 100px;
.cakes {
    width: 100%;
    height: calc(@div-width - 20px);
    border: 1px solid @text-color;
}

// 定义函数
.summer2(@size: 25px){
    font-size: @size;
}
.summer1 {
    width: 80px;
    height: 80px;
    .summer2(22px);
}

/*
    混入Mixins
*/
.honey2 {
    height: 70px;
}
.honey1 {
    width: 80px;
    .honey2;
}

// 映射
#colors-box() {
  primary: blue;
  secondary: green;
}
.fabulous {
    color: #colors-box[primary];
}

// 命名空间和访问符
#orange {
    .milk {
        color: brown;
    }
}
.dragonfly {
    .milk {
        #orange.milk();
    }
}

// if 条件语句 --- 用不了
@condition: "condition";
@show: true;
.butterfly {
    width: 80px;
    height: 80px;
    @if (@condition == 'condition') {
        background: #00BCD4;
    } @else if (@condition == 'condition6') {
        background: yellowgreen;
    } @else {
        background: rebeccapurple;
    }
    // 三元条件表达式 --- 用不了
    // color: @show ? 'red' : 'blue';
}


</style>
