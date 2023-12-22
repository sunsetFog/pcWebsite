
<template>
    <section id="upload-unit">
        <LineTextLine>单个上传图片</LineTextLine>
		<upload1 yuming="http://localhost:8062/sky/shop/upload"></upload1>

        <LineTextLine>上传图片列表</LineTextLine>
		<upload2></upload2>

        <LineTextLine>头像上传裁切</LineTextLine>
		<customAvatar></customAvatar>

        <LineTextLine>阿里云对象存储OSS</LineTextLine>
		<upload1 yuming="http://localhost:8069/sky/sys/oss/file/upload"></upload1>

        <LineTextLine>Minio对象存储</LineTextLine>
		<upload1 yuming="http://localhost:8069/sky/sys/upload/uploadMinio"></upload1>
    </section>
</template>

<script>
import upload1 from '@/views/home/managementCenter/file/upload/upload1.vue';
import upload2 from './upload2.vue';
import customAvatar from './customAvatar.vue';
export default {
	name: "uploadUnit",
	components: { upload1, upload2, customAvatar },
    data(){
        return{

        }
	},
	created() {
		this.ossList();
	},
    methods:{
		ossList() {
            let that = this;
            let json = {

            }
            that.$apihttp({
                url: 'http://localhost:8069/sky/sys/oss/file/list',
                method: 'get',
                data: json
            }).then((res) => {
                console.log('H-http',res);
            }).catch((err)=>{
                console.log('error',err);
            })

        },
    }
}
</script>

<style lang="less" scoped>
#upload-unit{
	width: 100%;
}
</style>

