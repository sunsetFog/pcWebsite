<template>
    <section>
        <p :class="$styles.mercury">CSS Modules 模块化样式</p>
        <br/>
        <!-- <p :class="$comic.bean">CSS Modules 模块化样式</p> -->
    </section>
</template>

<script>
import $comic from './foo.module.scss'
export default {
    name: '模块化样式',
    created() {
        console.log("--$style--", this.$styles);
        console.log("--$comic--", this.$comic);
    }
}
</script>

<!--
<style module> 默认暴露对象是$style
<style module="$styles"> 暴露对象修改为$styles
 -->
<style module="$styles">
.mercury {
    color: coral;
}
</style>
