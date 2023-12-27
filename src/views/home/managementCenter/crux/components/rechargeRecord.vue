<template>
    <section id="recharge-record">
        <el-dialog v-model="rechargeActive" width="1100px" top="153px" center title="充值记录">
            <div class="varieties-content">
                <div class="record-left">
                    <ul>
                        <li v-for="(item, index) in record_type" :class="{ 'type-active': item.active }"
                            @click="recordState(index)">
                            <span>{{ item.name }}</span>
                            <span v-if="item.active"></span>
                        </li>
                    </ul>
                </div>
                <div class="record-right">
                    <div class="record-example">
                        <div class="record-content" v-for="(item, index) in record_list">
                            <ul>
                                <li>
                                    <label>支付宝类型:</label>
                                    <span>{{ item.pay_type }}</span>
                                    <span>{{ item.money / 10000 }}</span>
                                </li>
                                <li>
                                    <label>订单号:</label>
                                    <span>{{ item.order_no }}</span>
                                    <button class="copy-dom" :data-clipboard-text="item.order_no"
                                        @click="copyText()">复制</button>
                                </li>
                                <li>
                                    <label>提交时间:</label>
                                    <span>{{ item.created_at }}</span>
                                </li>
                                <li>
                                    <label>状态:</label>
                                    <span>{{ item.status }}</span>
                                </li>
                            </ul>
                        </div>
                        <div class="no-time" v-show="no_have">暂无充值记录</div>
                    </div>
                </div>
            </div>
            <template #footer></template>
        </el-dialog>
    </section>
</template>

<script>
import Clipboard from 'clipboard';
export default {
    name: 'recharge-record',
    data() {
        return {
            rechargeActive: false,
            record_type: [
                { name: '全部', active: true },
                { name: '已完成', active: false },
                { name: '未成功', active: false }
            ],
            record_list: [],
            no_have: false
        }
    },
    methods: {
        changeMeans() {
            this.rechargeActive = true;
            this.recordState(0);
        },
        getJson(type) {
            var that = this;
            that.$means.amateur_recharge_recods(type, function (res) {
                that.record_list = res.list;
                for (let i = 0; i < that.record_list.length; i++) {
                    that.record_list[i].created_at = that.$means.getLocalTime(that.record_list[i].created_at);
                }
                if (that.record_list.length == 0) {
                    that.no_have = true;
                } else {
                    that.no_have = false;
                }
            })
        },
        recordState(index) {
            for (let i = 0; i < this.record_type.length; i++) {
                this.record_type[i].active = false;
            }
            this.record_type[index].active = true;
            this.record_list = [];
            if (index == 0) {
                this.getJson(3);
            } else if (index == 1) {
                this.getJson(1);
            } else if (index == 2) {
                this.getJson(2);
            }
        },
        copyText() {
            var clipboard = new Clipboard('.copy-dom')
            clipboard.on('success', e => {
                this.$message.success('复制成功');
                // 释放内存
                clipboard.destroy()
            })
            clipboard.on('error', e => {
                this.$message.error('该浏览器不支持自动复制');
                // 释放内存
                clipboard.destroy()
            })
        }
    }
}
</script>

<style lang="less" scoped>
#recharge-record {
    .varieties-content {
        width: 100%;
        height: 620px;

        .record-left {
            width: 155px;
            height: 620px;
            float: left;
            background: #291037;
            font-size: 20px;

            .type-active {
                .mixin_image(url('~@/views/home/managementCenter/crux/components/recharge/img/beijingkuang.png'));
            }

            ul {
                li {
                    width: 155px;
                    height: 65px;
                    float: left;
                    text-align: center;
                    line-height: 65px;
                    margin-top: 50px;
                    color: #ffffff;
                    background: #513663;
                    cursor: pointer;
                    position: relative;

                    span:nth-of-type(1) {
                        width: 100%;
                        height: 65px;
                        display: inline-block;
                        text-align: center;
                        line-height: 65px;
                        color: #ffffff;
                        position: absolute;
                        left: 0px;
                        top: 0px;
                    }

                    span:nth-of-type(2) {
                        width: 10px;
                        height: 65px;
                        display: inline-block;
                        text-align: center;
                        line-height: 65px;
                        color: #ffffff;
                        position: absolute;
                        right: -10px;
                        top: 0px;
                        .mixin_image(url('~@/views/home/managementCenter/crux/components/recharge/img/zhizhen.png'));
                    }
                }
            }
        }

        .record-right {
            width: 84%;
            height: 620px;
            float: right;
            padding: 30px 75px 0px 85px;

            .record-example {
                width: 100%;
                height: 560px;
                overflow-y: auto;
                padding-right: 10px;

                .record-content {
                    width: 100%;
                    height: 120px;
                    text-align: left;
                    line-height: 120px;
                    background: #ffffff;
                    color: #b00cb3;
                    margin-bottom: 15px;

                    ul {
                        li {
                            width: 100%;
                            height: 30px;
                            float: left;
                            text-align: center;
                            line-height: 30px;

                            label {
                                width: 250px;
                                height: 30px;
                                display: inline-block;
                                text-align: right;
                                line-height: 30px;
                                color: #b00cb3;
                                float: left;
                                font-size: 16px;
                            }

                            span:nth-of-type(1) {
                                width: auto;
                                height: 30px;
                                display: inline-block;
                                text-align: right;
                                line-height: 30px;
                                color: black;
                                float: left;
                                margin-left: 30px;
                                font-size: 16px;
                            }

                            span:nth-of-type(2) {
                                width: auto;
                                height: 30px;
                                display: inline-block;
                                text-align: right;
                                line-height: 30px;
                                color: orange;
                                float: left;
                                margin-left: 30px;
                                font-size: 16px;
                            }

                            button {
                                .mixin_button(50px, 28px, #d4c3b2, #b00cb3);
                                float: left;
                                border: 1px solid #b00cb3;
                                margin: 1px 0px 0px 30px;
                            }

                            button:hover {
                                background: #eceacc;
                            }
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
        }
    }
}
</style>
