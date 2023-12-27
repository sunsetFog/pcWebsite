<template>
    <section id="manage-alipay">
        <el-dialog v-model="rechargeActive" width="781px" top="240px" center title="管理支付宝">
            <div class="varieties-content">
                <div class="account-example">
                    <div class="account-list" v-for="(item, index) in alipay_list">
                        <label>支付宝{{ index + 1 }}:</label>
                        <div><span>{{ item.cardholder }}</span><span>{{ item.cardno }}</span></div>
                        <img src="@/views/home/managementCenter/crux/components/recharge/img/xiaochu.png"
                            @click="deleteAlipay(index)" />
                    </div>
                </div>

                <div class="confirm-add">
                    <button @click="sureAdd()">绑定支付宝</button>
                </div>
            </div>
            <template #footer></template>
        </el-dialog>
    </section>
</template>

<script>
export default {
    name: 'manage-alipay',
    data() {
        return {
            rechargeActive: false,
            alipay_list: []
        }
    },
    methods: {
        getAlipayJson() {
            var that = this;
            that.$means.amateur_bank_lists(2, function (res) {
                //console.log('提款alipay**&%%',res);
                that.alipay_list = res.list;
            })
        },
        changeMeans() {
            this.rechargeActive = true;
            this.getAlipayJson();
        },
        sureAdd() {
            this.$parent.hostMeans('addalipay');
        },
        deleteAlipay(index) {
            var that = this;
            that.$confirm('你是否解除当前支付宝?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //console.log('##alipay&&&');
                that.$means.amateur_unBindBank(2, that.alipay_list[index].bank_id, function (res) {
                    that.getAlipayJson();
                    that.$message.success('解绑成功');
                    that.$parent.hostMeans('withdrawal', 'alipay');
                })
            }).catch(() => {
                that.$message.info('已取消');
            });
        }
    }
}
</script>

<style lang="less" scoped>
#manage-alipay {
    .varieties-content {
        width: 100%;
        height: 465px;
        padding: 10px 40px 0px 40px;

        .account-example {
            width: 100%;
            height: 330px;
            border-bottom: 1px solid #b00cb3;

            .account-list {
                width: 100%;
                height: 45px;
                margin-top: 20px;

                label {
                    width: 100px;
                    height: 45px;
                    display: inline-block;
                    text-align: right;
                    line-height: 45px;
                    color: #ffffff;
                    float: left;
                    margin-right: 15px;
                    font-size: 18px;
                }

                div {
                    width: 505px;
                    height: 43px;
                    text-align: left;
                    line-height: 43px;
                    background: #1b041d;
                    color: #b00cb3;
                    float: left;
                    font-size: 18px;
                    padding-left: 10px;

                    span:nth-of-type(1) {
                        width: auto;
                        height: 43px;
                        display: inline-block;
                        text-align: right;
                        line-height: 43px;
                        color: #b00cb3;
                        float: left;
                        margin-right: 10px;
                        max-width: 200px;
                        overflow: hidden;
                    }

                    span:nth-of-type(2) {
                        width: auto;
                        height: 43px;
                        display: inline-block;
                        text-align: left;
                        line-height: 43px;
                        color: #b00cb3;
                        float: left;
                    }
                }

                img {
                    width: 30px;
                    height: 28px;
                    float: left;
                    margin: 8px 0px 0px 20px;
                    cursor: pointer;
                }
            }
        }

        .confirm-add {
            width: 100%;
            height: 35px;
            margin-top: 40px;
            padding: 0px 0px 0px 275px;

            button {
                .mixin_button(155px, 34px, #d4c3b2, #b00cb3);
                border: 1px solid #b00cb3;
            }

            button:hover {
                background: #eceacc;
            }
        }
    }
}
</style>
