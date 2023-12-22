<template>
    <section>
        <LineTextLine>文件上传</LineTextLine>
        <upload4 yuming="http://localhost:8062/sky/uploadFile" title_grain="文件上传"></upload4>
        <LineTextLine>文件上传Linux</LineTextLine>
        <upload4 yuming="http://localhost:8062/sky/uploadLinux" title_grain="文件上传Linux"></upload4>
    </section>
</template>

<script>
import axios from 'axios';
import upload4 from '@/views/home/managementCenter/file/upload/upload4.vue';
export default {
    components: { upload4 },
}
</script>
