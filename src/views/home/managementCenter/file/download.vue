<template>
    <section id="download">
        <LineTextLine>文件下载--本地文件</LineTextLine>
        <el-button @click="downloadTxt()">下载添加内容的文本</el-button>
        <el-button @click="downloadFile('@sky/rafaelDesign/static/capital/rem.js')">下载静态资源</el-button>
        <LineTextLine>下载图片</LineTextLine>
        <el-button @click="previewToDownload">图片预览转图片下载</el-button>
        <LineTextLine>文件预览</LineTextLine>
        <el-button @click="DocumentPreview">文件预览</el-button>
        <!--
            编辑，保存，重置，删除，批量删除，***查看，附件上传，查询，提交，新增，文件预览

下载，批量下载，导出一样
发票识别，自定义指令
         -->
    </section>
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return{

        }
    },
    methods: {
        downloadTxt() {//Blob下载添加内容的txt文档
            let content =  "Hello,world!text文本内容。";
            let a = document.createElement('a');
                a.download = "what_286.txt";
                a.href = window.URL.createObjectURL(new Blob([content]));
                document.body.appendChild(a)
                a.click();
                document.body.removeChild(a)
        },
        // Blob下载项目内文件
        downloadFile(path) {
            let urls = path.split('/');
            console.log('path===', urls);
            axios({
                method: 'get',
                url: path,
                data: '空',
                responseType: 'blob'
            }).then(res => {
                let aTag = document.createElement('a');// 创建a标签
                    aTag.download = urls[urls.length-1];// 设置下载属性
                    aTag.href = window.URL.createObjectURL(new Blob([res.data]));// 赋予文件下载地址
                    document.body.appendChild(aTag);// a标签插入页面里
                    aTag.click();// 强制触发a标签事件
                    document.body.removeChild(aTag);// 删除a标签
            }).catch(err => {

            })
        },
        previewToDownload() {
            let that = this;
            let json = {
                fileUrl: "http://localhost:8062/sky/img/avatorImages/1647277665830invoice.png"
            }
            that.$apihttp({
                url: 'http://localhost:8062/sky/previewToDownload',
                method: 'get',
                params: json
            }).then((res) => {
                console.log('下载图片路径=',res);
            }).catch((err)=>{
                console.log('error',err);
            })
        },
        // study: 文档预览
        DocumentPreview() {
            let that = this;
            let json = {

            }
            that.$apihttp({
                url: 'http://localhost:8062/sky/getFileViewDomain',
                method: 'get',
                params: json
            }).then((res) => {
                console.log('文档预览=',res);
                let url = "http://localhost:8062/sky/profile/1.pdf";
                window.open(res+'?officePreviewType=pdf&url='+encodeURIComponent(url));
            }).catch((err)=>{
                console.log('error',err);
            })
        }
    }
}
</script>

<style lang="less" scoped>
#download{

}
</style>
