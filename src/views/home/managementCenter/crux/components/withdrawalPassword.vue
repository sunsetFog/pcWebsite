<template>
    <section id="withdrawal-password">
        <el-dialog v-model="rechargeActive" width="781px" top="190px" center title="重置提款密码">
            <div class="varieties-content">
                <div class="no-regist-tel" v-if="!regist_tel">
                    <label>旧密码:</label>
                    <input type="password" maxlength="6" v-model.trim="old_password" placeholder="请输入旧密码" />
                </div>
                <div class="write-new">
                    <label>新提款密码:</label>
                    <input type="password" maxlength="6" v-model.trim="new_password" placeholder="请输入新提款密码" />
                </div>
                <div class="write-code" v-if="regist_tel">
                    <label>验证码:</label>
                    <input type="text" maxlength="10" v-model.trim="verify_code" placeholder="请填写验证码" />
                    <button @click="getAutoCode()" v-show="verify_active">获取验证码</button>
                    <button v-show="!verify_active">{{ verify_time }}s</button>
                </div>
                <div class="line-example"></div>
                <div class="confirm-add">
                    <button @click="sureModify()">确认修改</button>
                </div>
            </div>
            <template #footer></template>
        </el-dialog>
    </section>
</template>

<script>
export default {
    name: 'withdrawal-password',
    data() {
        return {
            rechargeActive: false,
            regist_tel: true,
            verify_code: '',
            verify_time: 60,
            verify_active: true,
            old_password: '',
            new_password: ''
        }
    },
    watch: {
        old_password(cur, old) {
            if (/[^\d]/g.test(cur)) {
                if (this.old_password.match(/[^\d]/g) != null) {
                    this.$message.error('请输入六位数字的密码！');
                }
                this.old_password = this.old_password.replace(/[^\d]/g, '');
            }
        },
        new_password(cur, old) {
            if (/[^\d]/g.test(cur)) {
                if (this.new_password.match(/[^\d]/g) != null) {
                    this.$message.error('请输入六位数字的密码！');
                }
                this.new_password = this.new_password.replace(/[^\d]/g, '');
            }
        }
    },
    methods: {
        changeMeans(value) {
            this.rechargeActive = true;
            this.regist_tel = value;
            this.verify_code = '';
            this.old_password = '';
            this.new_password = '';
        },
        getAutoCode() {
            var that = this;
            that.$means.amateur_getCaptcha_bindTel(function (res) { });
            that.verify_time = 60;
            that.verify_active = false;
            that.timer();
        },
        timer() {
            if (this.verify_time > 0) {
                this.verify_time--;
                setTimeout(this.timer, 1000);
            } else {
                this.verify_time = 0;
                this.verify_active = true;
            }
        },
        sureModify() {
            var that = this;
            if (that.new_password.length != 6) {
                that.$message.error('请输入六位数字的密码！');
                return;
            }
            if (that.regist_tel == true) {
                if (that.new_password == '') {
                    that.$message.error('请输入新密码！');
                    return;
                } else if (that.verify_code == '') {
                    that.$message.error('请输入验证码！');
                    return;
                }
                that.$means.amateur_resetMoneyPass_tel(that.new_password, that.verify_code, function (res) {
                    that.rechargeActive = false;
                    that.$message.success('提款密码修改成功！');
                })
            } else {
                if (that.old_password == '') {
                    that.$message.error('请输入旧密码！');
                    return;
                } else if (that.new_password == '') {
                    that.$message.error('请输入新密码！');
                    return;
                } else if (that.old_password == that.new_password) {
                    that.$message.error('新密码与旧密码一致了！');
                    return;
                }
                that.$means.amateur_resetMoneyPass_noTel(that.new_password, that.old_password, function (res) {
                    that.rechargeActive = false;
                    that.$message.success('提款密码修改成功！');
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
#withdrawal-password {
    .varieties-content {
        width: 100%;
        height: 465px;
        padding: 65px 40px 0px 40px;

        .write-code,
        .write-new,
        .no-regist-tel {
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

        .write-code,
        .write-new,
        .no-regist-tel {
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

        .write-code {
            input {
                width: 155px;
            }

            button {
                .mixin_button(120px, 43px, #d4c3b2, #b00cb3);
                float: left;
                margin-left: 10px;
                border: 1px solid #b00cb3;
            }

            button:hover {
                background: #eceacc;
            }
        }

        .write-code {
            margin-top: 40px;
        }

        .no-regist-tel {
            margin-bottom: 40px;
        }

        .line-example {
            width: 100%;
            height: 80px;
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
