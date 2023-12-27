<template>
    <section id="game-withdrawal">
        <el-dialog v-model="rechargeActive" width="1100px" top="153px" center title="提款">
            <div class="varieties-content">
                <div class="payment-type">
                    <ul>
                        <li v-for="(item, index) in withdrawal_types" :class="{ 'type-active': item.active }"
                            @click="paymentType(index)">
                            <span>{{ item.name }}</span>
                            <span v-if="item.active"></span>
                        </li>
                    </ul>
                </div>
                <div class="payment-content">
                    <div class="current-balance">
                        <label>当前余额:</label>
                        <input type="text" disabled v-model.trim="money_total" placeholder="当前余额" />
                    </div>
                    <div class="withdrawal-amount-s">
                        <label>提款金额:</label>
                        <img src="@/views/home/managementCenter/crux/components/recharge/img/jian.png"
                            :class="{ 'amount-disable': withdrawal_amount == '', 'amount-pointer': withdrawal_amount != '' }"
                            @click="addition(1)" />
                        <input v-model.trim="withdrawal_amount" type="text" placeholder="请输入提款金额" />
                        <img src="@/views/home/managementCenter/crux/components/recharge/img/jia.png"
                            @click="addition(2)" />
                    </div>
                    <div class="account-number" v-show="withdrawal_types[0].active">
                        <label>收取银行卡:</label>
                        <div class="user-account">
                            <el-select v-model="bank_card" placeholder="请选择银行卡" size="small">
                                <el-option v-for="(item, index) in bank_list" :key="item.bank_id" :label="item.cardno"
                                    :value="item.bank_id">
                                </el-option>
                            </el-select>
                        </div>
                        <button class="admin-account" @click="manageMeans(1)">管理银行卡</button>
                    </div>
                    <!-- <div class="account-number" v-show="withdrawal_types[1].active">
                    <label>支付宝账号:</label>
                    <div class="user-account">
                        <el-select v-model="alipay_card" placeholder="请选择支付宝" size="small">
                                <el-option
                                v-for="(item,index) in alipay_list"
                                :key="item.bank_id"
                                :label="item.cardno"
                                :value="item.bank_id">
                                </el-option>
                        </el-select>
                    </div>
                    <button class="admin-account" @click="manageMeans(2)">管理支付宝</button>
                </div> -->
                    <div class="line-bottom"></div>
                    <div class="payment-button">
                        <button @click="exchange()">确认兑换</button>
                    </div>
                </div>
            </div>
            <template #footer></template>
        </el-dialog>
    </section>
</template>

<script>
export default {
    name: 'game-withdrawal',
    data() {
        return {
            rechargeActive: false,
            withdrawal_types: [
                { name: '提款到银行卡', active: true },
                // {name: '提款到支付宝',active: false}
            ],
            bank_list: [],
            bank_card: '',
            alipay_list: [],
            alipay_card: '',
            money_total: '',
            withdrawal_amount: ''
        }
    },
    watch: {
        withdrawal_amount(cur, old) {
            if (/[^\d]/g.test(cur)) {
                if (cur.match(/[^\d]/g) != null) {
                    this.$message.error('请输入正整数！');
                }
                this.withdrawal_amount = this.withdrawal_amount.replace(/[^\d]/g, '');
            }
            if (cur > this.money_total) {
                this.$message.error('提款金额不能大于当前金额！');
                this.withdrawal_amount = parseInt(this.money_total);
            }
        }
    },
    methods: {
        changeMeans(value) {
            this.getBankJson();
            this.money_total = value;
            this.rechargeActive = true;
            this.paymentType(0);
            this.withdrawal_amount = '';
            this.bank_card = '';
            this.alipay_card = '';
        },
        getBankJson() {
            var that = this;
            that.$means.amateur_bank_lists(1, function (res) {
                //console.log('提款bank%%',res);
                that.bank_list = res.list;
                that.getAlipayJson();
            })
        },
        getAlipayJson() {
            var that = this;
            that.$means.amateur_bank_lists(2, function (res) {
                //console.log('提款alipay%%',res);
                that.alipay_list = res.list;
            })
        },
        paymentType(index) {
            for (let i = 0; i < this.withdrawal_types.length; i++) {
                this.withdrawal_types[i].active = false;
            }
            this.withdrawal_types[index].active = true;
            this.withdrawal_amount = '';
        },
        manageMeans(value) {
            if (value == 1) {
                this.$parent.hostMeans('managebank');
            } else if (value == 2) {
                this.$parent.hostMeans('managealipay');
            }
        },
        exchange() {
            var that = this;
            if (this.withdrawal_types[0].active == true) {
                if (that.withdrawal_amount == '') {
                    that.$message.error('请输入提款金额！');
                    return;
                } else if (that.bank_card == '') {
                    that.$message.error('请选取银行卡！');
                    return;
                }
                var card = that.bank_card;
            } else {
                if (that.withdrawal_amount == '') {
                    that.$message.error('请输入提款金额！');
                    return;
                } else if (that.alipay_card == '') {
                    that.$message.error('请选取支付宝！');
                    return;
                }
                var card = that.alipay_card;
            }
            //console.log('amount',that.withdrawal_amount*10000);
            that.$means.amateur_drawout(that.withdrawal_amount * 10000, card, function (res) {
                // console.log('success$$998888',res);
                that.money_total = res.balance / 10000;
                that.money_total = that.money_total.toFixed(2);
                that.$means.amateur_getPlayer('money').setMoney(res.balance);
                that.$parent.hostMeans('know', that.withdrawal_amount);
            })

        },
        addition(value) {
            if (value == 1) {
                if (this.withdrawal_amount - 200 > 0) {
                    this.withdrawal_amount = Number(this.withdrawal_amount) - 200;
                } else {
                    this.withdrawal_amount = '';
                }
            } else if (value == 2) {
                this.withdrawal_amount = Number(this.withdrawal_amount) + 200;
            }
        }
    }
}
</script>

<style lang="less" scoped>
#game-withdrawal {
    .varieties-content {
        width: 100%;
        height: 620px;

        .payment-type {
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

        .payment-content {
            width: 84%;
            height: 620px;
            float: right;
            padding: 75px 45px 0px 45px;

            .current-balance,
            .withdrawal-amount-s,
            .account-number {
                width: 100%;
                height: 45px;

                label {
                    width: 240px;
                    height: 45px;
                    display: inline-block;
                    text-align: right;
                    line-height: 45px;
                    color: #ffffff;
                    float: left;
                    margin-right: 20px;
                    font-size: 18px;
                }
            }

            .current-balance {
                input {
                    width: 280px;
                    height: 43px;
                    text-align: left;
                    line-height: 43px;
                    text-indent: 10px;
                    float: left;
                    background: #1b041d;
                    color: #b00cb3;
                    border: 1px solid #b00cb3;
                    font-size: 20px;
                    cursor: not-allowed;
                }
            }

            .withdrawal-amount-s {
                margin-top: 50px;

                .amount-disable {
                    cursor: not-allowed;
                }

                .amount-pointer {
                    cursor: pointer;
                }

                img:nth-of-type(1) {
                    width: 42px;
                    height: 38px;
                    float: left;
                    margin: 2px 14px 0px 0px;
                }

                input {
                    width: 160px;
                    height: 43px;
                    text-align: left;
                    line-height: 43px;
                    text-indent: 10px;
                    float: left;
                    background: #1b041d;
                    color: #b00cb3;
                    font-size: 20px;
                    border: 1px solid #b00cb3;
                    text-indent: 0px;
                    text-align: center;
                }

                img:nth-of-type(2) {
                    width: 42px;
                    height: 38px;
                    float: left;
                    margin: 2px 0px 0px 14px;
                    cursor: pointer;
                }
            }

            .account-number {
                margin-top: 50px;

                .user-account {
                    width: 280px;
                    height: 45px;
                    float: left;
                }

                .admin-account {
                    .mixin_button(122px, 34px, #d4c3b2, #b00cb3);
                    float: left;
                    margin: 5px 0px 0px 25px;
                    border: 1px solid #b00cb3;
                }

                .admin-account:hover {
                    background: #eceacc;
                }
            }

            .line-bottom {
                width: 100%;
                height: 45px;
                margin-top: 15px;
                border-bottom: 1px solid #b00cb3;
            }

            .payment-button {
                width: 100%;
                height: 36px;
                margin-top: 50px;

                button {
                    .mixin_button(155px, 34px, #d4c3b2, #b00cb3);
                    margin-left: 320px;
                    border: 1px solid #b00cb3;
                }

                button:hover {
                    background: #eceacc;
                }
            }
        }
    }
}
</style>
