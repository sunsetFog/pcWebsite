<template>
    <section id="router">
        <!-- https://segmentfault.com/a/1190000012393587 -->
        <el-button>
            <router-link to="/home/managementCenter/crux?id=888&status=false">
                路由router-link跳转
            </router-link>
        </el-button>
        
        <el-button type="primary" @click="jump()">路由跳转</el-button>

        <el-button type="primary" @click="code()">url编码</el-button>
    </section>    
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        jump(){
            this.$router.push({path: '/home/managementCenter/crux?id=100&status=九九'});//推荐用这个，没刷新问题
            // this.$router.go(-1);//返回上一页    参数1：数字，返回第几页

            // vue 中新窗口打开vue页面
            // this.$router.resolve({
            //     name: '',
            //     query: {

            //     }
            // })

            // this.$router.push({name: 'crux',query: {id: 100,status: true}});
            // this.$router.push({name: 'crux',params: {id: 1010,status: true}});
            // this.$router.push({path: '/home/managementCenter/crux',query: {id: 100,status: true}});
            // this.$router.push({path: '/home/managementCenter/crux',params: {id: 1010,status: true}});


            /*
            完整
                this.$router.push({
                    path: '/home/managementCenter/crux', --- 可以拼接参数 --- 刷新不丢失
                    name: 'crux',
                    query: {id: 100,status: true},   --- 刷新不丢失 --- 推荐
                    params: {id: 1010,status: true}  --- 刷新丢失 --- 解决在路由path:'/router/:id'
                });
            */
            console.log('查看路由参数',this.$route);
        },
        code(){
            /* 
            浏览器的地址栏中的url：

            URL不会被转义的字符，有两种：
1. URL元字符：分号（;），逗号（’,’），斜杠（/），问号（?），冒号（:），at（@），&，等号（=），加号（+），美元符号（$），井号（#）
2. 语义字符：a-z，A-Z，0-9，连词号（-），下划线（_），点（.），感叹号（!），波浪线（~），星号（*），单引号（），圆括号（()`）

encodeURI(参数1)  元字符和语义字符之外，都可以转义
encodeURIComponent(参数1)  语义字符之外，都可以转义

不同浏览器中url的编码方式   ---略
谷歌地址栏显示中文，ie显示编码，location.href获取显示编码
            */

            console.log('整条编码', encodeURI('http://localhost:2021/home/managementCenter/knowledge/router?title=您好')); // http://localhost:2021/home/managementCenter/knowledge/router?title=%E6%82%A8%E5%A5%BD
            console.log('整条解码', decodeURI('http://localhost:2021/home/managementCenter/knowledge/router?title=%E6%82%A8%E5%A5%BD')); // http://localhost:2021/home/managementCenter/knowledge/router?title=您好
            // this.$router.push({path: encodeURI('/home/managementCenter/crux?id=100&city=广州')});

            // url带的是中文参数，得用编码转换
            console.log('只有参数编码', '?title='+encodeURIComponent("究竟"));// ?title=%E7%A9%B6%E7%AB%9F
            console.log('只有参数解码', decodeURIComponent('%E7%A9%B6%E7%AB%9F'));

            this.$router.push({path: '/home/managementCenter/crux?id=100&name=' + encodeURIComponent('红雾君')});
        }
    }
}
</script>

<style lang="less" scoped>
#router{
    
}
</style>


