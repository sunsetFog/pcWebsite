<template>
    <section id="game-recharge">
        <el-dialog v-model="rechargeActive" width="1100px" top="153px" center title="充值">
            <div class="varieties-content">
                <div class="fashion-way">
                    <div class="payment-type">
                        <ul>
                            <li v-for="(item, index) in pay_types" :class="{ 'type-active': item.active }"
                                @click="paymentType(index)">
                                <span>{{ item.name }}</span>
                                <span v-if="item.active"></span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="payment-content">
                    <div class="payment-methods">
                        <ul>
                            <li v-for="(item, index) in payment_list" :class="{ 'mode-active': item.active }"
                                @click="modeMeans(index)">{{ item.name }}</li>
                        </ul>
                        <div class="no-time" v-show="no_have">暂无充值渠道</div>
                    </div>
                    <div class="recharge-money">
                        <span>充值金额:</span>
                        <input type="text" v-model.trim="money" maxlength="20" placeholder="请按充值范围输入您的充值金额" />
                        <img src="@/views/home/managementCenter/crux/components/recharge/img/xiaochu.png"
                            @click="money = ''" />
                    </div>
                    <div class="recharge-range">充值范围{{ min_limit }}-{{ max_limit }}元,比例为1:1</div>
                    <div class="money-example">
                        <ul>
                            <li v-for="(item, index) in money_list" :style="{ padding: item.padding }"
                                @mousedown="moneyDown(index)" @mouseup="moneyUp(index)">
                                <span><img :src="item.url" /></span>
                            </li>
                        </ul>
                    </div>
                    <div class="payment-button">
                        <button @click="confirmRecharge()">确认充值</button>
                    </div>
                    <div class="position-record">
                        <span></span>
                        <button @click="rechargeRecord()">充值记录</button>
                    </div>
                </div>
            </div>
            <template #footer></template>
        </el-dialog>
    </section>
</template>

<script>
export default {
    name: 'game-recharge',
    data() {
        return {
            rechargeActive: false,
            pay_data: '',
            pay_types: [],
            payment_list: [],
            money: '',
            money_list: [
                { name: 100, url: require('@/views/home/managementCenter/crux/components/recharge/img/100.png'), padding: '0px' },
                { name: 300, url: require('@/views/home/managementCenter/crux/components/recharge/img/300.png'), padding: '0px' },
                { name: 500, url: require('@/views/home/managementCenter/crux/components/recharge/img/500.png'), padding: '0px' },
                { name: 1000, url: require('@/views/home/managementCenter/crux/components/recharge/img/1000.png'), padding: '0px' },
                { name: 1500, url: require('@/views/home/managementCenter/crux/components/recharge/img/1500.png'), padding: '0px' },
                { name: 3000, url: require('@/views/home/managementCenter/crux/components/recharge/img/3000.png'), padding: '0px' },
                { name: 5000, url: require('@/views/home/managementCenter/crux/components/recharge/img/5000.png'), padding: '0px' },
                { name: 9999, url: require('@/views/home/managementCenter/crux/components/recharge/img/9999.png'), padding: '0px' }
            ],
            first_index: null,
            second_index: null,
            no_have: false,
            min_limit: 100,
            max_limit: 10000
        }
    },
    watch: {
        money(cur, old) {
            if (/[^\d]/g.test(cur)) {
                if (cur.match(/[^\d]/g) != null) {
                    this.$message.error('请输入正整数！');
                }
                this.money = this.money.replace(/[^\d]/g, '');
            } else if (cur > this.max_limit) {
                this.$message.error('请按充值范围输入您的充值金额！');
                this.money = this.max_limit;
            }
        }
    },
    methods: {
        changeMeans() {
            this.getJson();
            this.rechargeActive = true;
        },
        getJson() {
            var that = this;
            that.$means.amateur_recharge_types(function (value) {
                //console.log('recharge&&',value);
                that.pay_data = value;
                that.pay_types = [];
                for (let i = 0; i < value.pay_types.length; i++) {
                    that.pay_types.push({
                        name: value.pay_types[i].name,
                        id: value.pay_types[i].id,
                        pay_code: value.pay_types[i].pay_code,
                        active: false
                    })
                }
                that.pay_types[0].active = true;
                that.first_index = 0;
                that.paymentBtn(0);
            });
        },
        paymentType(index) {
            for (let i = 0; i < this.pay_types.length; i++) {
                this.pay_types[i].active = false;
            }
            this.pay_types[index].active = true;
            this.first_index = index;
            this.paymentBtn(index);
        },
        paymentBtn(index) {
            this.second_index = null;
            this.payment_list = [];
            if (!this.pay_data.pay_types[index].channel) {
                return;
            }
            for (let i = 0; i < this.pay_data.pay_types[index].channel.length; i++) {
                this.payment_list.push({
                    name: this.pay_data.pay_types[index].channel[i].name,
                    id: this.pay_data.pay_types[index].channel[i].channel_id,
                    pay_code: this.pay_data.pay_types[index].channel[i].pay_code,
                    max_limit: this.pay_data.pay_types[index].channel[i].max_limit,
                    min_limit: this.pay_data.pay_types[index].channel[i].min_limit,
                    active: false
                })
            }
            if (this.payment_list.length == 0) {
                this.no_have = true;
            } else {
                this.no_have = false;
            }
            if (this.payment_list.length != 0) {
                this.min_limit = this.payment_list[0].min_limit;
                this.max_limit = this.payment_list[0].max_limit;
            } else {
                this.min_limit = 100;
                this.max_limit = 10000;
            }

        },
        modeMeans(index) {
            this.second_index = index;
            for (let i = 0; i < this.payment_list.length; i++) {
                this.payment_list[i].active = false;
            }
            this.payment_list[index].active = true;
        },
        moneyUp(index) {
            for (let i = 0; i < this.money_list.length; i++) {
                this.money_list[i].padding = '0px';
            }
            this.money = this.money_list[index].name;
        },
        moneyDown(index) {
            this.money_list[index].padding = '3px';
        },
        rechargeRecord() {
            this.$parent.hostMeans('rechargerecord');
        },
        confirmRecharge() {
            var that = this;
            if (that.money == '') {
                that.$message.error('请输入充值金额！');
                return;
            } else if (that.second_index == null) {
                that.$message.error('请选择充值渠道！');
            } else if (that.money < that.min_limit || that.money > that.max_limit) {
                that.$message.error('请按充值范围输入您的充值金额！');
                return;
            } else {
                // console.log('充值json',that.money,that.payment_list[that.second_index].id,that.payment_list[that.second_index].pay_code,that.pay_types[that.first_index].id);
                that.$means.amateur_recharge_url(that.money, that.payment_list[that.second_index].id, that.payment_list[that.second_index].pay_code, that.pay_types[that.first_index].id, function (res) {
                    // console.log('充值',res.payurl);
                    window.open(res.payurl);
                });
            }
        }
    }
}
</script>

<style lang="less" scoped>
#game-recharge {
    .varieties-content {
        width: 100%;
        height: 620px;

        .fashion-way {
            width: 190px;
            height: 620px;
            float: left;
            overflow: auto;

            .payment-type {
                width: 155px;
                min-height: 620px;
                float: left;
                background: #291037;
                font-size: 20px;
                padding-bottom: 115px;

                .type-active {
                    .mixin_image(url('~@/views/home/managementCenter/crux/components/recharge/img/beijingkuang.png'));
                }

                ul {
                    width: 100%;
                    float: left;

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
        }

        .payment-content {
            width: 82%;
            height: 620px;
            float: right;
            padding: 0px 35px 0px 25px;

            .payment-methods {
                width: 100%;
                height: 210px;
                padding: 30px 0px 0px 0px;
                font-size: 20px;

                .mode-active {
                    .mixin_image(url('~@/views/home/managementCenter/crux/components/recharge/img/kuangkuang.png'));
                }

                ul {
                    li {
                        width: auto;
                        height: 45px;
                        float: left;
                        text-align: center;
                        line-height: 45px;
                        padding: 0px 20px 0px 20px;
                        margin: 25px 0px 0px 40px;
                        .mixin_image(url('~@/views/home/managementCenter/crux/components/recharge/img/zhifufangshi.png'));
                        color: #ffffff;
                        cursor: pointer;
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

            .recharge-money {
                width: 100%;
                height: 50px;
                position: relative;

                span {
                    width: 245px;
                    height: 50px;
                    display: inline-block;
                    text-align: right;
                    line-height: 50px;
                    color: #ffffff;
                    font-size: 24px;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                }

                input {
                    width: 385px;
                    height: 48px;
                    text-align: left;
                    line-height: 48px;
                    text-indent: 10px;
                    color: #402887;
                    font-size: 21px;
                    border-radius: 4px;
                    position: absolute;
                    left: 265px;
                    top: 0px;
                }

                img {
                    width: 40px;
                    height: 40px;
                    cursor: pointer;
                    position: absolute;
                    left: 605px;
                    top: 4px;
                }
            }

            .recharge-range {
                width: 100%;
                height: 50px;
                text-align: center;
                line-height: 50px;
                color: #b00cb3;
                padding-right: 120px;
                font-size: 16px;
            }

            .money-example {
                width: 100%;
                height: 180px;
                padding-left: 90px;
                border-bottom: 1px solid #b00cb3;

                ul {
                    li {
                        width: 112px;
                        height: 50px;
                        float: left;
                        text-align: center;
                        line-height: 50px;
                        margin: 20px 0px 0px 30px;
                        cursor: pointer;

                        span {
                            width: 100%;
                            height: 100%;
                            display: inline-block;
                            text-align: left;
                            line-height: 100%;
                            color: #ffffff;
                            .mixin_image(url('~@/views/home/managementCenter/crux/components/recharge/img/money.png'));

                            img {
                                width: 53.5%;
                                height: 60%;
                                float: left;
                                margin: 7% 0 0 21.4%;
                            }
                        }
                    }
                }
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

            .position-record {
                width: 100%;
                height: 30px;
                position: relative;

                span {
                    width: 155px;
                    height: 20px;
                    display: inline-block;
                    text-align: left;
                    line-height: 20px;
                    background: #291037;
                    color: #ffffff;
                    position: absolute;
                    left: -222px;
                    top: -41px;
                }

                button {
                    .mixin_button(155px, 65px, #513663, #ffffff);
                    position: absolute;
                    left: -222px;
                    top: -21px;
                }
            }
        }
    }
}
</style>
