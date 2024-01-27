<template>
    <section id="notice">
        <el-dialog v-model="rechargeActive" width="1215px" top="101px" center title="公告">
            <div class="varieties-content">
                <div class="mail-content">
                    <div class="mail-example" v-for="(item, index) in mail_list" @click="consult(index, false)">
                        <div class="picture-example">
                            <img v-show="!item.is_readed"
                                src="@/views/home/managementCenter/crux/components/recharge/img/weidu.png" />
                            <img v-show="item.is_readed"
                                src="@/views/home/managementCenter/crux/components/recharge/img/yidu.png" />
                        </div>
                        <div class="information">
                            <span>{{ item.title }}</span>
                            <button v-show="!item.is_readed" @click.stop="consult(index, true)">点击查阅</button>
                            <img v-show="item.is_readed"
                                src="@/views/home/managementCenter/crux/components/recharge/img/read.png" />
                        </div>
                    </div>
                    <div class="no-time" v-show="no_have">暂无公告</div>
                </div>
                <div class="page-example">
                    <pagination :pagingObj="pagingObj" @emitWay="getJson"></pagination>
                </div>
            </div>
            <template #footer></template>
        </el-dialog>
    </section>
</template>

<script>
import pagination from '@sky/rafaelDesign/web/components/pagination.vue';
export default {
    name: 'notice',
    components: { pagination },
    data() {
        return {
            rechargeActive: false,
            mail_list: [],
            pagingObj: { pageNum: 1, pageSize: 25, total: 0 },
            no_have: false
        }
    },
    methods: {
        changeMeans() {
            this.getJson();
            this.rechargeActive = true;
        },
        getJson() {
            var that = this;
            //console.log('youjian***',that.pagination);
            that.$means.amateur_get_message(1, function (res) {
                //console.log('邮件##',res);
                for (let i = 0; i < res.list.length; i++) {
                    res.list[i].created_at = that.$means.getLocalTime(res.list[i].created_at);
                    // let timestamp = res.list[i].created_at;
                    // let newDate = new Date();
                    // newDate.setTime(timestamp * 1000);
                    // let year = newDate.toLocaleDateString();
                    // let time = newDate.toLocaleTimeString();
                    // let yearArr = year.split('/');
                    // let yearData = yearArr[0]+'.'+yearArr[1]+'.'+yearArr[2]+' '+time.split(' ')[0];
                    // res.list[i].created_at = yearData;
                }
                if (that.pagingObj.pageNum == 1) {
                    if (9 <= res.list.length - 1) {
                        var start = 0;
                        var end = 9;
                    } else {
                        var start = 0;
                        var end = res.list.length - 1;
                    }
                } else if (that.pagingObj.pageNum == 2) {
                    if (19 <= res.list.length - 1) {
                        var start = 10;
                        var end = 19;
                    } else {
                        var start = 10;
                        var end = res.list.length - 1;
                    }
                } else if (that.pagingObj.pageNum == 3) {
                    if (29 <= res.list.length - 1) {
                        var start = 20;
                        var end = 29;
                    } else {
                        var start = 20;
                        var end = res.list.length - 1;
                    }
                } else if (that.pagingObj.pageNum == 4) {
                    if (39 <= res.list.length - 1) {
                        var start = 30;
                        var end = 39;
                    } else {
                        var start = 30;
                        var end = res.list.length - 1;
                    }
                } else if (that.pagingObj.pageNum == 5) {
                    if (49 <= res.list.length - 1) {
                        var start = 40;
                        var end = 49;
                    } else {
                        var start = 40;
                        var end = res.list.length - 1;
                    }
                }
                that.mail_list = [];
                for (let k = start; k <= end; k++) {
                    that.mail_list.push(res.list[k]);
                }
                that.pagingObj.pageSize = 10;
                if (res.totalrows <= 50) {
                    that.pagingObj.total = res.totalrows;
                } else {
                    that.pagingObj.total = 50;
                }
                if (that.mail_list.length == 0) {
                    that.no_have = true;
                } else {
                    that.no_have = false;
                }
            })
        },
        consult(index, value) {
            if (value == true) {
                this.$parent.hostMeans('notice', this.mail_list[index].id);
            } else {
                if (this.mail_list[index].is_readed == true) {
                    this.$parent.hostMeans('notice', this.mail_list[index].id);
                }
            }
        },
    }
}
</script>

<style lang="less" scoped>
#notice {
    .varieties-content {
        width: 100%;
        height: 710px;
        padding: 25px 35px 0px 35px;

        .mail-content {
            width: 100%;
            height: 600px;
            overflow-y: auto;

            .mail-example {
                width: 100%;
                height: 105px;
                margin-bottom: 25px;

                .picture-example {
                    width: 13%;
                    height: 100%;
                    float: left;
                    background: #420f4a;
                    border-top-left-radius: 4px;
                    border-bottom-left-radius: 4px;

                    img {
                        width: 75px;
                        height: 60px;
                        float: left;
                        margin: 20px 0px 0px 40px;
                    }
                }

                .information {
                    width: 87%;
                    height: 105px;
                    text-align: left;
                    line-height: 105px;
                    background: #1b041d;
                    color: #ffffff;
                    float: left;
                    position: relative;

                    span:nth-of-type(1) {
                        width: auto;
                        height: 35px;
                        display: inline-block;
                        text-align: left;
                        line-height: 35px;
                        color: #ffffff;
                        font-size: 24px;
                        position: absolute;
                        left: 35px;
                        top: 15px;
                    }

                    button {
                        .mixin_button(125px, 34px, #d4c3b2, #b00cb3);
                        border: 1px solid #b00cb3;
                        position: absolute;
                        right: 35px;
                        top: 35px;
                    }

                    button:hover {
                        background: #eceacc;
                    }

                    img {
                        width: 80px;
                        height: 80px;
                        position: absolute;
                        right: 58px;
                        top: 12px;
                    }
                }
            }

            .no-time {
                width: 100%;
                height: 80px;
                text-align: center;
                line-height: 80px;
                color: #735885;
                font-size: 20px;
            }

        }

        .page-example {
            width: 100%;
            height: 40px;
            margin-top: 25px;
        }
    }
}
</style>
