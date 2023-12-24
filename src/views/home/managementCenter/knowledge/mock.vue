<template>
    <section id="mock">
        <LineTextLine>基础content渲染</LineTextLine>
        <div v-for="(item, index) in markers" :key="index" v-html="item.content"></div>

        <LineTextLine>template模板渲染</LineTextLine>

        <template v-for="item,index in 2">
            <p>{{index}}===={{item}}</p>
        </template>
        <LineTextLine>slot插槽渲染</LineTextLine>

        <LineTextLine>render渲染</LineTextLine>
    </section>
</template>
<!--
    mock本地模拟数据
    四种渲染方式
    在template上使用for循环
        template的作用是模板占位符，可帮助我们包裹元素，但在循环过程当中，template不会被渲染到页面上
 -->
<script>
//npm install mockjs --save
export default {
    data() {
        return {
            markers: []
        };
    },
    created() {
        this.getJson();
        this.demo();
    },
    methods: {
        getJson () {
            let self = this;
            self.$apihttp({
                url: process.env.VUE_APP_MOCK_URL + '/store/price-list',
                method: 'post',
                data: {}
            }).then((res) => {
                self.markers = res.data.map(function (item) {
                return {
                    position: { lng: item.project_long, lat: item.project_lat },
                    lng: item.project_long,
                    lat: item.project_lat,
                    name: item.project_SALEname,
                    month_price: item.deal_PRICE,
                    increase: item.mom_rate,
                    project_id: item.project_id,
                    mom_rate: Number(Number(item.mom_rate).toFixed(1)),
                    active: 'rgba(42,130,228,0.8)',
                    z_index: -10,
                    text: `<div>喀喀喀<span>6666${item.project_SALEname}</span></div>`,
                    content: ''
                }
                })
                for (let i = 0; i < self.markers.length; i++) {
                    let line
                    if (self.markers[i].month_price) {
                        line = '<span>' + self.quantile(self.markers[i].month_price) + '万/㎡</span>'
                    } else {
                        line = '<span>-</span>'
                    }
                    if (self.markers[i].mom_rate >= 0) {
                        self.markers[i].content = `
                        <div class="add-container">
                            <div class="project-name">${self.markers[i].name}</div>
                            <button class="this-month">本月均价${line}</button>
                            <span class="compare-month">比上月</span>
                            <div class="percentage-i">
                            <span>${self.markers[i].mom_rate}%</span>
                            <el-icon><CaretTop style="color: #D0021B;"/></el-icon>
                            </div>
                        </div>
                        `
                    } else {
                        self.markers[i].content = `
                        <div class="add-container">
                            <div class="project-name">${self.markers[i].name}</div>
                            <button class="this-month">本月均价${line}</button>
                            <span class="compare-month">比上月</span>
                            <div class="percentage-i">
                            <span>${self.markers[i].mom_rate}%</span>
                            <el-icon><CaretBottom style="color: #6BCB04;"/></el-icon>
                            </div>
                        </div>
                        `
                    }
                }
            }).catch((err) => {
                console.log('error',err);
            })
        },
        quantile (num) {
            if (num === '') {
                return ''
            }
            // let chu = Number(num) / 10000
            // let dian = chu.toFixed(2)
            // return Number(dian).toLocaleString()
            return ((Number(num) / 10000).toFixed(2)).toLocaleString()
        },
        /* 调用mock接口 */
        demo () {
            let self = this;
            self.$apihttp({
                url: process.env.VUE_APP_MOCK_URL + '/store/goods-list',
                method: 'post',
                data: { store_id: 12, current_page: 3, page_size: 10 }
            }).then((res) => {
                console.log('---后台返回数据---', res)
            }).catch((err) => {
                console.log('error',err);
            })
        }

    }
}
</script>

<style lang="less" scoped>
#mock {
    color: white;
    :deep(.add-container) {
        width: 155px;
        height: 55px;
        background: rgba(42,130,228,0.8);
        border-radius: 8px;
        position: relative;
        overflow: hidden;
        margin-top: 5px;
        .project-name {
            width: 100%;
            height: 25px;
            text-align: center;
            line-height: 25px;
            color: white;
            font-size: 12px;
            overflow: hidden;
            position: absolute;
            top: 0;
            left: 0;
        }
        .this-month {
            width: 100px;
            height: 20px;
            text-align: center;
            line-height: 20px;
            color: #5E92C5;
            background: white;
            border-radius: 8px;
            font-size: 10px;
            border: none;
            outline: none;
            overflow: hidden;
            position: absolute;
            top: 28px;
            left: 5px;
        }
        .compare-month {
            color: white;
            font-size: 10px;
            position: absolute;
            top: 24px;
            right: 5px;
        }
        .percentage-i {
            position: absolute;
            top: 38px;
            right: 2px;
            i {
                font-size: 18px;
                float: right;
            }
            span {
                color: white;
                font-size: 10px;
                float: right;
                padding: 3px 0 0 0;
            }
        }
        .percentage-span {
            color: white;
            font-size: 10px;
            position: absolute;
            top: 40px;
            right: 5px;
        }
    }
}
</style>
