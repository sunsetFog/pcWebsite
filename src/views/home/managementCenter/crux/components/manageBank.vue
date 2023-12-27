<template>
    <section id="manage-bank">
        <el-dialog v-model="rechargeActive" width="781px" top="240px" center title="管理银行卡">
            <div class="varieties-content">
                <div class="account-example">
                    <div class="account-list" v-for="(item, index) in bank_list">
                        <label>卡{{ index + 1 }}:</label>
                        <div><span>{{ item.bank_name }}</span><span>{{ item.cardno }}</span></div>
                        <img src="@/views/home/managementCenter/crux/components/recharge/img/xiaochu.png"
                            @click="deleteBank(index)" />
                    </div>
                </div>

                <div class="confirm-add">
                    <button @click="sureAdd()">添加银行卡</button>
                </div>
            </div>
            <template #footer></template>
        </el-dialog>
    </section>
</template>

<script>
export default {
    name: 'manage-bank',
    data() {
        return {
            rechargeActive: false,
            bank_list: []
        }
    },
    methods: {
        getBankJson() {
            var that = this;
            that.$means.amateur_bank_lists(1, function (res) {
                //console.log('提款bank%%',res);
                that.bank_list = res.list;
            })
        },
        changeMeans() {
            this.rechargeActive = true;
            this.getBankJson();
        },
        sureAdd() {
            this.$parent.hostMeans('addbank');
        },
        deleteBank(index) {
            var that = this;
            that.$confirm('你是否解除当前银行卡?', '温馨提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.$means.amateur_unBindBank(1, that.bank_list[index].bank_id, function (res) {
                    that.getBankJson();
                    that.$message.success('解绑成功');
                    that.$parent.hostMeans('withdrawal', 'bank');
                })
            }).catch(() => {
                that.$message.info('已取消');
            });
        }
    }
}
</script>

<style lang="less" scoped>
#manage-bank {
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
                    width: 70px;
                    height: 45px;
                    display: inline-block;
                    text-align: right;
                    line-height: 45px;
                    color: #ffffff;
                    margin-right: 15px;
                    font-size: 18px;
                }

                div {
                    width: 520px;
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
