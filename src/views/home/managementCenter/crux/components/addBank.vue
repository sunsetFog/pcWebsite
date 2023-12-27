<template>
    <section id="add-bank">
        <el-dialog v-model="rechargeActive" width="781px" top="240" center title="添加银行卡">
            <div class="varieties-content">
                <div class="account-name">
                    <label>开户姓名:</label>
                    <input type="text" maxlength="10" v-model.trim="account_name" placeholder="请输入开户人姓名" />
                </div>
                <div class="card-number">
                    <label>银行卡号:</label>
                    <input type="text" maxlength="19" v-model.trim="card_number" placeholder="请输入银行卡号" />
                </div>
                <div class="opening-bank">
                    <label>开户行:</label>
                    <input type="text" maxlength="12" v-model.trim="opening_bank" placeholder="请输入开户行" />
                </div>
                <div class="line-example"></div>
                <div class="confirm-add">
                    <button @click="sureAdd()">确认添加</button>
                </div>
            </div>
            <template #footer></template>
        </el-dialog>
    </section>
</template>

<script>
export default {
    name: 'add-bank',
    data() {
        return {
            rechargeActive: false,
            account_name: '',
            card_number: '',
            opening_bank: ''
        }
    },
    watch: {
        account_name(cur, old) {
            let validat = this.$means.validatSpecial(cur);
            if (validat.state) {
                this.account_name = validat.value;
            }
        },
        opening_bank(cur, old) {
            let validat = this.$means.validatSpecial(cur);
            if (validat.state) {
                this.opening_bank = validat.value;
            }
        },
        card_number(cur, old) {
            if (/[^\d]/g.test(cur)) {
                if (this.card_number.match(/[^\d]/g) != null) {
                    this.$message.error('请输入19位数字的银行卡号！');
                }
                this.card_number = cur.replace(/[^\d]/g, '');
            }
        },
    },
    methods: {
        changeMeans() {
            this.rechargeActive = true;
            this.account_name = '';
            this.card_number = '';
            this.opening_bank = '';
        },
        sureAdd() {
            var that = this;
            if (that.account_name == '') {
                that.$message.error('请输入开户姓名！');
                return;
            } else if (that.card_number == '') {
                that.$message.error('请输入银行卡号！');
                return;
            } else if (that.opening_bank == '') {
                that.$message.error('请输入开户行！');
                return;
            }
            that.$means.amateur_bindBank(1, that.account_name, that.opening_bank, that.card_number, function (res) {
                //console.log('add_bank',res);
                that.rechargeActive = false;
                that.$parent.hostMeans('withdrawal', 'bank');
                that.$parent.hostMeans('managebank');
                that.$message.success('添加银行卡成功');
            })
        }
    }
}
</script>

<style lang="less" scoped>
#add-bank {
    .varieties-content {
        width: 100%;
        height: 465px;
        padding: 45px 40px 0px 40px;

        .account-name,
        .card-number,
        .opening-bank {
            width: 100%;
            height: 45px;

            label {
                width: 220px;
                height: 45px;
                display: inline-block;
                text-align: right;
                line-height: 45px;
                color: #ffffff;
                float: left;
                margin-right: 15px;
                font-size: 18px;
            }
        }

        .account-name,
        .card-number,
        .opening-bank {
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

        .card-number,
        .opening-bank {
            margin-top: 40px;
        }

        .line-example {
            width: 100%;
            height: 60px;
            border-bottom: 1px solid #b00cb3;
        }

        .confirm-add {
            width: 100%;
            height: 35px;
            margin-top: 50px;
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
