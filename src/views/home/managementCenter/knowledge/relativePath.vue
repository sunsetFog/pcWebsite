<template>
    <section id="relativePath">
        <LineTextLine>直接用</LineTextLine>
        <img src="@sky/rafaelDesign/static/image1/lizhi.jpg"/>
        <img src="@sky/rafaelDesign/static/picture/breezy/mangguo.jpg"/>

        <LineTextLine>import图片路径</LineTextLine>
        <img :src="import_ai"/>

        <LineTextLine>require图片路径</LineTextLine>
        <img :src="require('@sky/rafaelDesign/static/image1/lizhi.jpg')"/>
    </section>
</template>

<script>

/*

用require不正确写法报错：
./src/assets ^\.\/.*$
Module not found: Error: Can't resolve 'style-loader' in

相对路径：从当前目录开始定位，形成的路径
绝对定位: 从顶级目录src开始定位，形成的路径

相对路径: 用的多，打包时易报错，找不到路径
./assets/logo_blue.png

相对路径，没前缀，被webpack解析为 相对路径
assets/logo_blue.png

绝对路径，带~  被webpack解析为 require() 动态引入
~@sky/rafaelDesign/static/image1/theme/logo_blue.png
background: url('~@sky/rafaelDesign/static/image1/theme/logo_blue.png') no-repeat center center;

绝对路径，相对根目录的路径 webpack不解析
/src/assets/logo_blue.png

*/
import lizhi from '@sky/rafaelDesign/static/image1/lizhi.jpg'
export default {
    name: 'relativePath',
    data () {
        return {
            import_ai: lizhi,
        }
    },
    created(){

    },
    methods:{

    }
}
</script>

<style lang="less" scoped>
#relativePath {
    color: yellowgreen;
    img {
        width: 100px;
        height: 100px;
    }
}
</style>
