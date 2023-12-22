<template>
    <section>
        <LineTextLine>文件上传</LineTextLine>
        <upload4 yuming="http://localhost:8062/sky/uploadFile" title_grain="文件上传"></upload4>
        <LineTextLine>文件上传Linux</LineTextLine>
        <upload4 yuming="http://localhost:8062/sky/uploadLinux" title_grain="文件上传Linux"></upload4>
        <LineTextLine>原生文件上传</LineTextLine>
        <upload3></upload3>
    </section>
</template>

<script>
import upload4 from '@/views/home/managementCenter/file/upload/upload4.vue';
import upload3 from '@/views/home/managementCenter/file/upload/upload3.vue';
export default {
    components: { upload3, upload4 },
    methods: {
    }
}
</script>
