<template>
    <section>
        <LineTextLine>文件下载--导出</LineTextLine>
        <el-button type="primary" @click="exportExcel()"><el-icon><Download /></el-icon>&nbsp;EasyExcel导出</el-button>
        <LineTextLine>文件下载--导出</LineTextLine>
        <el-button @click="excelWay">jeecgboot导出</el-button>
        <LineTextLine>文件上传--导入</LineTextLine>
		<upload4 yuming="http://localhost:8062/sky/importExcel" title_grain="导入"></upload4>
    </section>
</template>

<script>
import axios from 'axios';
import upload4 from '@/views/home/managementCenter/file/upload/upload4.vue';
export default {
    components: { upload4 },
    methods: {
        excelWay() {
            let that = this;

            let params = {
                filename: "商品信息统计报表"
            }

            axios({
                url: 'http://localhost:8062/sky/exportXls',
                method: 'get',
                params: params,
                responseType: 'blob',// 表明返回服务器返回的数据类型
                // headers: {
                //     'Content-Type': 'application/json'
                // }
            }).then((res) => {// 处理返回的文件流
                /*
                    下载的excel文件打开为乱码,postman下载正常,前端问题
                    https://www.cnblogs.com/stcweb/articles/16066788.html
                    打印res显示：request: MockXMLHttpRequest
                    需要main.js关闭Mock
                    打印res显示：request: XMLHttpRequest

                */
                console.log('--res1--', res);
                // 后端设置content-disposition中文乱码，放弃这个方式了
                let contentDisposition = res.headers['content-disposition'].split('filename=')[1];
                let filename = decodeURI(contentDisposition);
                console.log("----filename---", filename);
                let blobOptions = res.headers['content-type'];
                console.log("----blobOptions---", blobOptions);


                let file01 = {
                    name: params.filename,
                    suffix: '.xls',
                    blobOptions: { type: 'application/vnd.ms-excel' }
                }
                let file02 = {
                    name: params.filename,
                    suffix: '.xlsx',
                    blobOptions: { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
                    // 3种文件类型
                    // blobOptions: { type: '.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel' }
                }
                let file03 = {
                    name: params.filename,
                    suffix: '.csv',
                    blobOptions: { type: 'text/csv' }
                }
                file01.title = file01.name + file01.suffix;

                let bolbData = new Blob([res.data], file01.blobOptions);

                if (typeof window.navigator.msSaveBlob !== 'undefined') {
                    console.log("IE浏览器", file01.title);
                    window.navigator.msSaveBlob(bolbData, file01.title);
                } else {
                    console.log("非IE浏览器", file01.title);
                    let url = window.URL.createObjectURL(bolbData);
                    let aTag = document.createElement('a');
                    aTag.style.display = 'none';
                    aTag.href = url;
                    aTag.setAttribute('download', file01.title);
                    document.body.appendChild(aTag);
                    aTag.click();
                    document.body.removeChild(aTag); //下载完成移除元素
                    window.URL.revokeObjectURL(url); //释放掉blob对象
                }
            }).catch((err)=>{
                console.log('error',err);
            })
        },
        exportExcel() {
            // window.open('/sky/excel/file')
            let that = this;

            let params = {
                // fileName: "数据导出",
                // pageObj: { page: 1,pagesize: 15 },
                // templateCode: "Tax"//模板编码
            }

            that.$apihttp({
                url: '/sky/excel/file',
                method: 'get',
                params: params,
                responseType: 'blob'// 关键
            }).then((res) => {
                console.log('--res0--', res);
                if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE浏览器
                    console.log(1111)
                    window.navigator.msSaveOrOpenBlob(res, 'test.xlsx');
                } else {
                    console.log(2222)
                    const a = document.createElement('a');
                    a.download = 'test.xlsx';
                    a.href = window.URL.createObjectURL(new Blob([res]))
                    document.body.appendChild(a)
                    a.click()
                    document.body.removeChild(a)
                }
            }).catch((err)=>{
                console.log('error',err);
            })
        },
    }
}
</script>
