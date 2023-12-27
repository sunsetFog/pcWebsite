<template>
    <section id="refs">
        <LineTextLine>ref操作DOM</LineTextLine>
        <button @click="light" class='rainbow' id="880" ref="stars">获取我</button>
        <LineTextLine>ref调用子组件data和方法</LineTextLine>
        <button type="warning" @click="gift">ref调用子组件数据和方法</button>
        <moon ref="play"></moon>
    </section>
</template>

<script>
import moon from './parent/children';
export default {
    components: { moon },
    data() {
        return {

        }
    },
    methods: {
        light() {
            alert(this.$refs.stars.id);//获取属性值,标志位置
            //方法一:
            // var peach = document.getElementsByClassName('rainbow')[0];
            //相当于方法二:
            var peach = this.$refs.stars;
            console.log(peach);
            this.$refs.stars.innerHTML = 'hello';
        },
        gift() {
            let that = this;
            that.$refs.play.son = "ref改变子组件数据";
            //触动子组件方法
            that.$refs.play.secret();//常用
            console.log('$nextTick是DOM的异步更新');
        },
        initial(value) {

        }
    },
}
</script>

<style lang="less" scoped>
#refs {
    .rainbow {
        width: 100%;
        height: 50px;
        text-align: center;
        line-height: 50px;
        color: #b00cb3;
    }
}
</style>
