<template>
    <section id="safe-deposit">
        <el-dialog v-model="rechargeActive" width="1100px" top="101px" center title="保险箱">
            <div class="varieties-content">
                <div class="service-type">
                    <ul>
                        <li v-for="(item, index) in service_list" :class="{ 'type-active': item.active }"
                            @click="serviceType(index)">
                            <span>{{ item.name }}</span>
                            <span v-if="item.active"></span>
                        </li>
                    </ul>
                </div>
                <div class="safe-content">
                    <div class="account-balance">
                        <label>账户余额:</label>
                        <input type="text" disabled v-model.trim="money_total" placeholder="请输入账户余额" />
                    </div>
                    <div class="amount-deposited">
                        <label>已存余额:</label>
                        <input type="text" disabled v-model.trim="deposited_money" placeholder="请输入已存金额" />
                    </div>
                    <div class="input-deposit">
                        <label>{{ deposit_label }}:</label>
                        <input type="text" maxlength="20" v-model.trim="save_money" :placeholder="deposit_place" />
                    </div>
                    <div class="safe-button">
                        <button @click="safeMeans()">{{ deposit_btn }}</button>
                    </div>
                </div>
            </div>
            <template #footer></template>
        </el-dialog>
    </section>
</template>

<script>
export default {
    name: 'safe-deposit',
    data() {
        return {
            rechargeActive: false,
            service_list: [
                { name: '存入', active: true },
                { name: '取出', active: false }
            ],
            deposit_index: 0,
            deposit_label: '输入存款',
            deposit_place: '请输入存款',
            deposit_btn: '取出',
            money_total: 0,
            deposited_money: 0,
            save_money: '',
        }
    },
    watch: {
        save_money(cur, old) {
            // console.log('current',cur,this.deposited_money);
            if (/[^\d]/g.test(cur)) {
                if (cur.match(/[^\d]/g) != null) {
                    this.$message.error('请输入正整数！');
                }
                this.save_money = this.save_money.replace(/[^\d]/g, '');
            }
            this.positiveNumber(cur);
        }
    },
    methods: {
        positiveNumber(value) {
            if (this.money_total < 0) {
                this.$message.error('余额不足！');
                this.save_money = '';
                return;
            }
            if (this.deposit_index == 0) {
                if (value > parseInt(this.money_total)) {
                    this.$message.error('存入金额不能大于账户余额！');
                    this.save_money = parseInt(this.money_total);
                }
            } else if (this.deposit_index == 1) {
                if (value > parseInt(this.deposited_money)) {
                    this.$message.error('取出金额不能大于已存金额！');
                    this.save_money = parseInt(this.deposited_money);
                }
            }
        },
        changeMeans(value, res, save) {
            this.rechargeActive = true;
            this.money_total = res;
            this.deposited_money = save / 10000;
            this.deposited_money = this.deposited_money.toFixed(2);
            this.serviceType(0);
            if (value == false) {
                this.capitalCode();
            }
        },
        capitalCode() {
            var that = this;
            that.$prompt('请设置资金密码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType: 'password',
                inputPattern: /^[0-9]{1,6}$/,
                inputErrorMessage: '请输入六位数字的密码！'
            }).then(({ value }) => {
                that.$means.amateur_initMoneyPass(value, function (res) {
                    that.$message.success('提款密码设置成功！');
                })
            }).catch(() => {
                that.$message.error('请先设置资金密码！');
                that.rechargeActive = false;
            });
        },
        serviceType(index) {
            this.deposit_index = index;
            this.save_money = '';
            if (index == 0) {
                this.deposit_label = '输入存款';
                this.deposit_place = '请输入存款';
                this.deposit_btn = '存入';
            } else {
                this.deposit_label = '输入取款';
                this.deposit_place = '请输入取款';
                this.deposit_btn = '取出';
            }
            for (let i = 0; i < this.service_list.length; i++) {
                this.service_list[i].active = false;
            }
            this.service_list[index].active = true;
        },
        safeMeans() {
            var that = this;
            if (that.save_money == '') {
                if (that.deposit_index == 0) {
                    that.$message.error('请输入存款！');
                } else if (that.deposit_index == 1) {
                    that.$message.error('请输入取款！');
                }
                return;
            }
            that.$prompt('请输入资金密码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputType: 'password',
                inputPattern: /^[0-9]{1,6}$/,
                inputErrorMessage: '请输入六位数字的密码！'
            }).then(({ value }) => {
                if (that.deposit_index == 0) {
                    that.$means.amateur_safeMoney(that.save_money * 10000, value, function (res) {
                        that.money_total = res.balance / 10000;
                        that.money_total = that.money_total.toFixed(2);
                        that.$means.amateur_getPlayer('money').setMoney(res.balance);
                        that.$means.amateur_getPlayer('safe_money').setSafeMoney(res.deposit);
                        that.$store.dispatch('getPlayerInfo', that.$means.amateur_getPlayer());
                        that.$parent.getJson();
                        that.deposited_money = Number(that.deposited_money) + Number(that.save_money);
                        that.deposited_money = that.deposited_money.toFixed(2);
                        that.save_money = '';
                        that.$message.success('存入成功！');
                    })
                } else if (that.deposit_index == 1) {
                    that.$means.amateur_takeMoney(that.save_money * 10000, value, function (res) {
                        that.money_total = res.balance / 10000;
                        that.money_total = that.money_total.toFixed(2);
                        that.$means.amateur_getPlayer('money').setMoney(res.balance);
                        that.$means.amateur_getPlayer('safe_money').setSafeMoney(res.deposit);
                        that.$store.dispatch('getPlayerInfo', that.$means.amateur_getPlayer());
                        that.$parent.getJson();
                        that.deposited_money = Number(that.deposited_money) - Number(that.save_money);
                        that.deposited_money = that.deposited_money.toFixed(2);
                        that.save_money = '';
                        that.$message.success('取出成功！');
                    })
                }
            }).catch(() => {
                that.$message.info('已取消操作！')
            });
        }
    }
}
</script>

<style lang="less" scoped>
#safe-deposit {
    .varieties-content {
        width: 100%;
        height: 620px;

        .service-type {
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

        .safe-content {
            width: 84%;
            height: 620px;
            float: right;
            padding: 75px 40px 0px 40px;

            .account-balance,
            .amount-deposited,
            .input-deposit {
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
                    font-size: 18px;
                }
            }

            .amount-deposited,
            .input-deposit {
                margin-top: 40px;
            }

            .account-balance,
            .amount-deposited {
                input {
                    cursor: not-allowed;
                }
            }

            .safe-button {
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
