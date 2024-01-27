<template>
    <section id="mail">
        <el-dialog v-model="rechargeActive" width="1215px" top="101px" center title="邮件">
            <div class="varieties-content">
                <div class="mail-content">
                    <div class="mail-example"
                        v-for="(item, index) in mail_list.slice((pagingObj.pageNum - 1) * pagingObj.pageSize, pagingObj.pageNum * pagingObj.pageSize)"
                        @click="consult(index, false)">
                        <div class="picture-example">
                            <img v-show="!item.is_readed"
                                src="@/views/home/managementCenter/crux/components/recharge/img/weidu.png" />
                            <img v-show="item.is_readed"
                                src="@/views/home/managementCenter/crux/components/recharge/img/yidu.png" />
                        </div>
                        <div class="information">
                            <span>{{ item.title }}</span>
                            <span></span>
                            <span>{{ item.created_at }}</span>
                            <button v-show="!item.is_readed" @click.stop="consult(index, true)">点击查阅</button>
                            <img v-show="item.is_readed"
                                src="@/views/home/managementCenter/crux/components/recharge/img/read.png" />
                        </div>
                    </div>
                    <div class="no-time" v-show="no_have">暂无邮件</div>
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
    name: 'mail',
    components: { pagination },
    data() {
        return {
            rechargeActive: false,
            mail_list: [],
            pagingObj: { pageNum: 1, pageSize: 10, total: 0 },
            no_have: false
        }
    },
    created() {
        this.getJson();
    },
    methods: {
        changeMeans() {
            this.getJson();
            this.rechargeActive = true;
        },
        getJson() {
            var that = this;
            //console.log('youjian***',that.pagination);
            that.$means.amateur_get_email(1, function (res) {
                //console.log('邮件##',res);
                let count_readed = 0;
                for (let i = 0; i < res.list.length; i++) {
                    if (res.list[i].is_readed == false) {
                        count_readed += 1;
                    }
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
                that.$parent.hostMeans('mail', 'readed', count_readed);

                that.mail_list = res.list;

                that.pagingObj.total = res.totalrows;
                if (that.mail_list.length == 0) {
                    that.no_have = true;
                } else {
                    that.no_have = false;
                }

            })
        },
        consult(index, value) {
            if (value == true) {
                this.$parent.hostMeans('mail', this.mail_list[index].id);
            } else {
                if (this.mail_list[index].is_readed == true) {
                    this.$parent.hostMeans('mail', this.mail_list[index].id);
                }
            }
        },
    }
}
</script>

<style lang="less" scoped>
#mail {
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

                    span:nth-of-type(2) {
                        width: auto;
                        height: 35px;
                        display: inline-block;
                        text-align: left;
                        line-height: 35px;
                        color: #ffffff;
                        font-size: 16px;
                        position: absolute;
                        left: 35px;
                        top: 58px;
                    }

                    span:nth-of-type(3) {
                        width: auto;
                        height: 35px;
                        display: inline-block;
                        text-align: left;
                        line-height: 35px;
                        color: #ffffff;
                        font-size: 16px;
                        position: absolute;
                        left: 460px;
                        bottom: 15px;
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
