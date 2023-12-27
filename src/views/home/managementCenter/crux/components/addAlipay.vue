<template>
    <section id="add-alipay">
        <el-dialog v-model="rechargeActive" width="781px" top="240px" center title="绑定支付宝">
            <div class="varieties-content">
                <div class="account-name">
                    <label>支付宝账号:</label>
                    <input type="text" maxlength="25" v-model.trim="account" placeholder="请输入支付宝账号" />
                </div>
                <div class="card-number">
                    <label>实名制姓名:</label>
                    <input type="text" maxlength="25" v-model.trim="real_name" placeholder="请输入实名制姓名" />
                </div>
                <div class="line-example">支付宝绑定的注意事项说明</div>
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
    name: 'add-alipay',
    data() {
        return {
            rechargeActive: false,
            account: '',
            real_name: ''
        }
    },
    methods: {
        changeMeans() {
            this.rechargeActive = true;
            this.account = '';
            this.real_name = '';
        },
        sureAdd() {
            var that = this;
            if (that.account == '') {
                that.$message.error('请输入支付宝账号！');
                return;
            } else if (that.real_name == '') {
                that.$message.error('请输入实名制姓名！');
                return;
            }
            that.$means.amateur_bindBank(2, that.real_name, '', that.account, function (res) {
                //console.log('add_alipay',res);
                that.rechargeActive = false;
                that.$parent.hostMeans('withdrawal', 'alipay');
                that.$parent.hostMeans('managealipay');
                that.$message.success('添加支付宝成功');
            })
        }
    }
}
</script>

<style lang="less" scoped>
#add-alipay {
    .varieties-content {
        width: 100%;
        height: 465px;
        padding: 45px 40px 0px 40px;

        .account-name,
        .card-number {
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
        .card-number {
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

        .card-number {
            margin-top: 40px;
        }

        .line-example {
            width: 100%;
            height: 120px;
            text-align: left;
            line-height: 120px;
            color: #b00cb3;
            line-height: 90px;
            border-bottom: 1px solid #b00cb3;
            padding-left: 235px;
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
