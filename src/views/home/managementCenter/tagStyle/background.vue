<template>
    <section id="backgroundUnit">
        <LineTextLine>background能分解为background-*</LineTextLine>

        <div class="peach">

        </div>
        <LineTextLine>根据用户设备的分辨率匹配合适的图像</LineTextLine>
        <div class="goods">

        </div>
        <br/>
        <div class="duck">
            <!-- 推荐
                2x可改1000w  宽度
            -->
            <img src="@sky/rafaelDesign/static/picture/breezy/logo.png" srcset="@sky/rafaelDesign/static/picture/breezy/logo_2x.png 2x,@sky/rafaelDesign/static/picture/breezy/logo_3x.png 3x" />
            <!-- <img src="~@sky/rafaelDesign/static/reportForms/luckDraw/choujiang_bg.png" srcset="~@sky/rafaelDesign/static/reportForms/luckDraw/choujiang_bg.png 2x,~@sky/rafaelDesign/static/reportForms/luckDraw/choujiang_bg.png 3x"/> -->
        </div>

    </section>
</template>

<script>
</script>

<style lang="less">
#backgroundUnit {
    background: #fff;
    padding: 20px;
    .peach {
        width: 320px;
        height: 180px;
        border: 1px solid #3f5075;
        background-image: url("~@sky/rafaelDesign/static/video/yujie.jpg");// 要使用的背景图像
        background-size: 100% 100%;// 背景图片的尺寸
        background-repeat: no-repeat;// 如何重复
        background-position: 12px 0;// 位置
        background-color: #FF8A00;// 背景颜色
        //background: #00FF00 url(bgimage.gif) no-repeat fixed top;// 可以设置所有的背景属性
    }
    .goods {
        width: 320px;
        height: 180px;
        // 不推荐  兼容性  https://blog.csdn.net/JackieDYH/article/details/113850806
        background-image: image-set(
            url("~@sky/rafaelDesign/static/image1/AheadVenus.png") 1x,
            url("~@sky/rafaelDesign/static/image1/INVAGE.png") 2x
        );
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .duck {
        width: 320px;
        height: 180px;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
