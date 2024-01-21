<template>
    <section id="upload3">
        <div class="file">
            <input accept="image/*" type="file" @change="handleFileUpload"/>
        </div>
    </section>
</template>

<script>
export default {
    name: "upload3",
    data() {
        return {

        }
    },
    methods: {
        handleFileUpload(event) {
            console.log('--handleFileUpload--', event);
            let that = this;
            var imgFile = event.target.files[0]; // 获取图片文件
            /*
                为啥用FormData？为啥用'Content-Type': 'multipart/form-data'？
                因为上传文件file是二进制
            */
            var formData = new FormData(); // 创建form对象
            formData.append('file', imgFile);  // 通过append向form对象添加数据
            formData.append('id', 1);
            // 遍历formData
            // for (let [name, value] of formData) {
            //     console.log(`${name}: ${value}`);
            // }

            that.$apihttp({
                url: '/sky/shop/upload',
                method: 'post',
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((res) => {
                console.log('--handleFileUpload--', res);
            }).catch((err)=>{
                console.log('error',err);
            })
        }
    }
}
</script>

<style lang="less" scoped>
#upload3 {

}
</style>


