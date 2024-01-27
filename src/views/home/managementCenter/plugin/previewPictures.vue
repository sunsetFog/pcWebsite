<template>
    <section id="previewPictures">
        <previewPictures></previewPictures>
    </section>
</template>
<!--
    vue3改版：图片预览是vue2插件，不支持vue3
 -->
<script>
import previewPictures from '@sky/rafaelDesign/web/components/previewPictures.vue';
export default {
    name: "previewPictures00",
    components: { previewPictures }
}
</script>

<style lang="less" scoped>
#previewPictures {

}
</style>


