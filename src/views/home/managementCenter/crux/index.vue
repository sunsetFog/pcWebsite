<template>
    <section id="crux">
        <div class="personal-information">
            <div class="information-left">
                <div class="user-title">个人信息</div>
                <div class="user-contain">
                    <div class="user-info">
                        <img :src="portrait.head" @click="portraitMeans()" />
                        <img :src="portrait.frame" />
                        <span>{{ player.nickname }}</span>
                    </div>
                    <div class="account-balance">
                        <label>账户余额:</label>
                        <span><img v-for="(item, index) in number_money" :src="number_count[item].url" /></span>
                        <span @click="payMeans(0)">充值</span>
                    </div>
                    <div class="user-id">
                        <label>我的ID:</label>
                        <span>{{ player.mShowUid }}</span>
                        <button class="copy-dom" :data-clipboard-text="player.mShowUid" @click="copyText()">复制</button>
                    </div>
                    <div class="nickname">
                        <label>昵称:</label>
                        <div class="edit-name" v-if="!nickname_state">
                            <span>{{ player.nickname }}</span>
                            <el-icon>
                                <Edit @click="nicknameEdit()" />
                            </el-icon>
                        </div>
                        <div class="nickname-select" v-else>
                            <input type="text" placeholder="请输入昵称" v-model.trim="pet_name" ref="pet_name"
                                @input="changeValue" />
                            <button @click="nicknameDetermine">确定</button>
                            <button @click="nickname_state = false">取消</button>
                        </div>
                    </div>
                    <div class="sex-example">
                        <label>性别:</label>
                        <div class="edit-sex" v-if="sex_state == false">
                            <span v-if="player.sex == 1">男</span>
                            <span v-if="player.sex == 2">女</span>
                            <el-icon>
                                <Edit @click="sexEdit()" />
                            </el-icon>
                        </div>
                        <div class="sex-select" v-else>
                            <el-select v-model="sex_value" placeholder="请选择" size="small">
                                <el-option v-for="item in sex_options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                            <button @click="sexDetermine()">确定</button>
                            <button @click="sex_state = false">取消</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="information-right">
                <div class="archives-list" v-for="(item, index) in archives_list">
                    <div class="archives-header"></div>
                    <div class="archives-contain">
                        <img :src="item.url" />
                        <span>{{ item.theme }}</span>
                        <span v-if="index != 2">{{ item.explain }}</span>
                        <span v-else>{{ count_readed }}{{ item.explain }}</span>
                        <span @click="archivesMeans(index)">{{ item.modify }}</span>
                    </div>
                </div>
            </div>
        </div>


        <recharge ref="recharge"></recharge>
        <withdrawal ref="withdrawal"></withdrawal>
        <manage-bank ref="manageBank"></manage-bank>
        <add-bank ref="addBank"></add-bank>
        <manage-alipay ref="manageAlipay"></manage-alipay>
        <add-alipay ref="addAlipay"></add-alipay>
        <withdrawal-password ref="withPassword"></withdrawal-password>
        <know ref="know"></know>
        <mail ref="mail"></mail>
        <notice ref="notice"></notice>
        <consult ref="consult"></consult>
        <login-password ref="loginPassword"></login-password>
        <safe-deposit ref="safeDeposit"></safe-deposit>
        <portrait ref="portrait"></portrait>
        <recharge-record ref="rechargeRecord"></recharge-record>
    </section>
</template>

<script>
import recharge from '@/views/home/managementCenter/crux/components/recharge/index.vue';
import withdrawal from '@/views/home/managementCenter/crux/components/withdrawal.vue';
import manageBank from '@/views/home/managementCenter/crux/components/manageBank.vue';
import addBank from '@/views/home/managementCenter/crux/components/addBank.vue';
import manageAlipay from '@/views/home/managementCenter/crux/components/manageAlipay.vue';
import addAlipay from '@/views/home/managementCenter/crux/components/addAlipay.vue';
import withdrawalPassword from '@/views/home/managementCenter/crux/components/withdrawalPassword.vue';
import know from '@/views/home/managementCenter/crux/components/know.vue';
import mail from '@/views/home/managementCenter/crux/components/mail.vue';
import notice from '@/views/home/managementCenter/crux/components/notice.vue';
import consult from '@/views/home/managementCenter/crux/components/consult.vue';
import loginPassword from '@/views/home/managementCenter/crux/components/loginPassword.vue';
import safeDeposit from '@/views/home/managementCenter/crux/components/safeDeposit.vue';
import portrait from '@/views/home/managementCenter/crux/components/portrait/index.vue';
import rechargeRecord from '@/views/home/managementCenter/crux/components/rechargeRecord.vue';


import Clipboard from 'clipboard';
import { mapGetters } from 'vuex';
export default {
    name: 'crux',
    components: { recharge, withdrawal, manageBank, addBank, manageAlipay, addAlipay, withdrawalPassword, know, mail, notice, consult, loginPassword, safeDeposit, portrait, rechargeRecord },
    data() {
        return {
            nickname_state: false,
            archives_list: [
                { theme: '登陆密码', explain: '6-12个字符', modify: '修改登录密码', url: require('@/views/home/managementCenter/crux/img/denglu.png') },
                // {theme: '绑定银行卡',explain: '最多可绑定5张银行卡',modify: '绑定银行卡',url: require('@/views/home/managementCenter/crux/img/yinhangka.png')},
                { theme: '提款密码', explain: '6个数字密码', modify: '设置提款密码', url: require('@/views/home/managementCenter/crux/img/tikuanmima.png') },
                { theme: '邮件', explain: '条未读', modify: '查看邮件', url: require('@/views/home/managementCenter/crux/img/zhanneixin.png') },
                // {theme: '密保设定',explain: '用于找回密码',modify: '修改密保设定',url: require('@/views/home/managementCenter/crux/img/baomi.png')},
                { theme: '公告', explain: '请随时关注最新公告', modify: '查看公告', url: require('@/views/home/managementCenter/crux/img/xinxi.png') },
                { theme: '保险箱', explain: '用于存入和取出资金', modify: '查看保险箱', url: require('@/views/home/managementCenter/crux/img/baoxianxiang.png') }
            ],
            pet_name: '',
            number_count: [
                { url: require('@/views/home/managementCenter/crux/img/0.png') },
                { url: require('@/views/home/managementCenter/crux/img/1.png') },
                { url: require('@/views/home/managementCenter/crux/img/2.png') },
                { url: require('@/views/home/managementCenter/crux/img/3.png') },
                { url: require('@/views/home/managementCenter/crux/img/4.png') },
                { url: require('@/views/home/managementCenter/crux/img/5.png') },
                { url: require('@/views/home/managementCenter/crux/img/6.png') },
                { url: require('@/views/home/managementCenter/crux/img/7.png') },
                { url: require('@/views/home/managementCenter/crux/img/8.png') },
                { url: require('@/views/home/managementCenter/crux/img/9.png') },
                { url: require('@/views/home/managementCenter/crux/img/dian.png') },
                { url: require('@/views/home/managementCenter/crux/img/11.png') }
            ],
            number_money: [],
            portrait: { head: '', frame: '' },
            count_readed: 0,//邮件阅读
            sex_options: [
                { value: 1, label: '男' },
                { value: 2, label: '女' }
            ],
            sex_value: 1,
            sex_state: false
        }
    },
    created() {
        console.log('和黄鹤楼了了：', this.player)
        this.getJson();
    },
    computed: {
        ...mapGetters([
            'player'
        ])
    },
    methods: {
        getJson() {
            this.portrait.head = require('@/views/home/managementCenter/crux/components/portrait/img/ui_headImg_' + this.player.avatar + '.png');
            this.portrait.frame = require('@/views/home/managementCenter/crux/components/portrait/img/ui_headBox_' + this.player.avatar_box + '.png');
            this.pet_name = this.player.nickname;
            this.sex_value = this.player.sex;

            this.number_money = this.player.money.toString().split('');
            for (let i = 0; i < this.number_money.length; i++) {
                if (this.number_money[i] == '.') {
                    this.number_money[i] = 10;
                } else if (this.number_money[i] == '-') {
                    this.number_money[i] = 11;
                }
            }
        },
        changeValue() {
            let leng = this.$means.validateTextLength(this.pet_name)
            if (leng.active) {
                if (leng.chinese) {
                    this.pet_name = this.pet_name.substring(0, 6);
                    this.$refs.pet_name.maxLength = 6
                } else {
                    this.pet_name = this.pet_name.substring(0, 8);
                    this.$refs.pet_name.maxLength = 8
                }
            } else {
                this.pet_name = this.pet_name.substring(0, 11);
                this.$refs.pet_name.maxLength = 11
            }
        },
        portraitMeans() {
            this.$refs.portrait.changeMeans(this.player.avatar, this.player.avatar_box);
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
        },
        allEmpty() {
            this.nickname_state = false;
            this.sex_state = false;
        },
        nicknameEdit() {
            this.allEmpty();
            this.pet_name = this.player.nickname;
            this.nickname_state = true;
        },
        sexEdit() {
            this.allEmpty();
            this.sex_value = this.player.sex;
            this.sex_state = true;
        },
        nicknameDetermine() {
            var that = this;
            if (that.pet_name == '') {
                that.$message.error('昵称不能为空！');
                return;
            }
            that.$means.amateur_updateName(that.pet_name, function (res) {
                that.$message.success('修改昵称成功！');
                that.player.nickname = that.pet_name;
                that.nickname_state = false;
            })
        },
        sexDetermine() {
            var that = this;
            that.$means.amateur_updateSex(that.sex_value, function (res) {
                that.$means.amateur_getPlayer('sex').setSex(that.sex_value);
                that.$store.dispatch('getPlayerInfo', that.$means.amateur_getPlayer());
                that.sex_state = false;
                that.$message.success('修改性别成功！');
            })
        },
        payMeans(index) {
            this.allEmpty();
            this.$refs.recharge.changeMeans();
        },
        archivesMeans(index) {
            this.allEmpty();
            if (index == 0) {
                this.$refs.loginPassword.changeMeans(this.player.isRegistBytel);//是否手机邮件注册-子用
            } else if (index == 1) {
                this.$refs.withPassword.changeMeans(this.player.isRegistBytel);
            } else if (index == 2) {
                this.$refs.mail.changeMeans();
            } else if (index == 3) {
                this.$refs.notice.changeMeans();
            } else if (index == 4) {
                this.$refs.safeDeposit.changeMeans(this.player.isPwdSeted, this.player.money, this.player.safe_money);
            }
        },
        hostMeans(value, response, count) {
            if (value == 'managebank') {
                this.$refs.manageBank.changeMeans();
            } else if (value == 'addbank') {
                this.$refs.addBank.changeMeans();
            } else if (value == 'managealipay') {
                this.$refs.manageAlipay.changeMeans();
            } else if (value == 'addalipay') {
                this.$refs.addAlipay.changeMeans();
            } else if (value == 'know') {
                this.$refs.know.changeMeans(response);
            } else if (value == 'mail') {
                if (response == 'get') {
                    this.$refs.mail.getJson();
                } else if (response == 'readed') {
                    this.count_readed = count;
                } else {
                    this.$refs.consult.changeMeans('mail', response);
                }
            } else if (value == 'notice') {
                if (response == 'get') {
                    this.$refs.notice.getJson();
                } else {
                    this.$refs.consult.changeMeans('notice', response);
                }
            } else if (value == 'withdrawal') {
                if (response == 'bank') {
                    this.$refs.withdrawal.getBankJson();
                } else if (response == 'alipay') {
                    this.$refs.withdrawal.getAlipayJson();
                }
            } else if (value == 'portrait') {
                if (response == 'head') {
                    this.portrait.head = count;
                } else if (response == 'frame') {
                    this.portrait.frame = count;
                }
            } else if (value == 'rechargerecord') {
                this.$refs.rechargeRecord.changeMeans();
            }
        }
    }
}
</script>

<style lang="less" scoped>
#crux {
    width: 100%;
    height: 100%;

    .personal-information {
        width: 100%;
        height: 100%;

        .information-left {
            width: 36.9%;
            height: 100%;
            float: left;

            .user-title {
                border-top: 7px solid #b00cb3;
                width: 100%;
                height: 70px;
                text-align: left;
                line-height: 70px;
                background: #513663;
                color: #dbcbb7;
                text-indent: 20px;
                font-size: 20px;
                line-height: 60px;
            }

            .user-contain {
                width: 100%;
                height: 731px;
                text-align: left;
                line-height: 731px;
                background: #2e163d;
                color: #ffffff;
                padding: 0px 20px;

                .user-info {
                    width: 100%;
                    height: 205px;
                    text-align: left;
                    line-height: 205px;
                    color: #ffffff;
                    position: relative;

                    img:nth-of-type(1) {
                        width: 80px;
                        height: 80px;
                        position: absolute;
                        left: 50%;
                        top: 45px;
                        margin-left: -40px;
                        z-index: 3;
                        cursor: pointer;
                    }

                    img:nth-of-type(2) {
                        width: 138px;
                        height: 138px;
                        position: absolute;
                        left: 50%;
                        top: 15px;
                        margin-left: -69px;
                        z-index: 2;
                    }

                    span {
                        width: 100%;
                        height: 30px;
                        display: inline-block;
                        text-align: center;
                        line-height: 30px;
                        color: #ffffff;
                        position: absolute;
                        top: 150px;
                        font-weight: 600;
                        font-size: 18px;
                    }
                }

                .account-balance,
                .nickname,
                .sex-example,
                .user-id {
                    width: 100%;
                    height: 30px;
                    text-align: left;
                    line-height: 30px;
                    color: #ffffff;
                    margin-bottom: 10px;
                    font-size: 16px;

                    label {
                        width: auto;
                        height: 30px;
                        display: inline-block;
                        text-align: center;
                        line-height: 30px;
                        color: #dbcbb7;
                        margin-right: 10px;
                        float: left;
                    }
                }

                .account-balance {
                    span:nth-of-type(1) {
                        width: auto;
                        height: 30px;
                        display: inline-block;
                        text-align: center;
                        line-height: 30px;
                        color: #ffffff;
                        padding-top: 5px;
                        float: left;

                        img {
                            width: 15px;
                            height: 20px;
                            float: left;
                        }
                    }

                    span:nth-of-type(2) {
                        width: auto;
                        height: 30px;
                        display: inline-block;
                        text-align: center;
                        line-height: 30px;
                        color: #dbcbb7;
                        float: right;
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }

                .user-id {
                    span {
                        width: 150px;
                        height: 30px;
                        display: inline-block;
                        text-align: left;
                        line-height: 30px;
                        color: #ffffff;
                        float: left;
                    }

                    button {
                        .mixin_button(auto, 28px, #d4c3b2, #b00cb3);
                        float: right;
                        font-size: 12px;
                        border: 1px solid #b00cb3;
                        padding: 0px 5px 0px 5px;
                    }

                    button:hover {
                        background: #eceacc;
                    }
                }

                .nickname,
                .sex-example {

                    .edit-sex,
                    .edit-name {
                        span:nth-of-type(1) {
                            width: auto;
                            height: 30px;
                            display: inline-block;
                            text-align: center;
                            line-height: 30px;
                            color: #dbcbb7;
                            float: left;
                        }

                        i {
                            color: #ffffff;
                            margin: 7px 0px 0px 30px;
                            cursor: pointer;
                            float: left;
                        }
                    }

                    .nickname-select {
                        width: 80%;
                        height: 30px;
                        float: right;

                        input {
                            width: 100px;
                            height: 28px;
                            text-align: left;
                            line-height: 28px;
                            text-indent: 10px;
                            border: 1px solid #b00cb3;
                            background: #1b041d;
                            color: #b00cb3;
                            vertical-align: middle;
                            float: left;
                        }
                    }

                    .sex-select {
                        width: 80%;
                        height: 30px;
                        float: right;
                    }

                    .nickname-select,
                    .sex-select {
                        button:nth-of-type(1) {
                            .mixin_button(auto, 28px, #d4c3b2, #b00cb3);
                            border: 1px solid #b00cb3;
                            font-size: 12px;
                            float: right;
                            margin-left: 5px;
                            padding: 0px 5px 0px 5px;
                        }

                        button:nth-of-type(1):hover {
                            background: #eceacc;
                        }

                        button:nth-of-type(2) {
                            .mixin_button(auto, 28px, #1b041d, #b00cb3);
                            border: 1px solid #b00cb3;
                            font-size: 12px;
                            float: right;
                            padding: 0px 5px 0px 5px;
                        }

                        button:nth-of-type(2):hover {
                            background: #2d0730;
                        }
                    }
                }
            }

        }

        .information-right {
            width: 63.1%;
            height: 100%;
            float: right;
            padding: 0px 0px 0px 20px;

            .archives-list {
                width: 100%;
                height: 145px;
                text-align: left;
                line-height: 145px;
                float: left;
                margin-bottom: 20px;

                .archives-header {
                    width: 100%;
                    height: 45px;
                    text-align: left;
                    line-height: 45px;
                    background: #513663;
                    color: #ffffff;
                    border-top: 7px solid #b00cb3;
                }

                .archives-contain {
                    width: 100%;
                    height: 95px;
                    text-align: left;
                    line-height: 95px;
                    background: #2e163d;
                    color: #ffffff;
                    position: relative;

                    img {
                        width: 55px;
                        height: 55px;
                        position: absolute;
                        left: 20px;
                        top: 18px;
                    }

                    span:nth-of-type(1) {
                        width: auto;
                        height: 25px;
                        display: inline-block;
                        text-align: left;
                        line-height: 25px;
                        color: #ffffff;
                        font-size: 20px;
                        position: absolute;
                        left: 100px;
                        top: 20px;
                    }

                    span:nth-of-type(2) {
                        width: auto;
                        height: 25px;
                        display: inline-block;
                        text-align: left;
                        line-height: 25px;
                        color: #735885;
                        font-size: 16px;
                        position: absolute;
                        left: 100px;
                        top: 50px;
                    }

                    span:nth-of-type(3) {
                        width: auto;
                        height: 25px;
                        display: inline-block;
                        text-align: right;
                        line-height: 25px;
                        color: #b00cb3;
                        font-size: 16px;
                        position: absolute;
                        right: 20px;
                        top: 20px;
                        text-decoration: underline;
                        cursor: pointer;
                    }
                }
            }
        }
    }

}
</style>
