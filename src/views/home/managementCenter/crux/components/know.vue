<template>
    <section id="know">
        <el-dialog v-model="rechargeActive" width="535px" top="280px" center title="">
            <div class="varieties-content">
                <div class="already-submit">您的提款申请已提交</div>
                <div class="withdrawal-money">提款金额为<span>{{ money }}</span>金币</div>
                <div class="attention">请留意游戏信息哈，看申请结果，谢谢~</div>
                <div class="sure-btn">
                    <button @click="sureMeans()">知道了</button>
                </div>
            </div>
            <template #footer></template>
        </el-dialog>
    </section>
</template>

<script>
export default {
    name: 'know',
    data() {
        return {
            rechargeActive: false,
            money: ''
        }
    },
    methods: {
        changeMeans(value) {
            this.rechargeActive = true;
            this.money = value;
        },
        sureMeans() {
            this.rechargeActive = false;
        }
    }
}
</script>

<style lang="less" scoped>
#know {
    .varieties-content {
        width: 100%;
        height: 295px;
        padding: 35px 35px 0px 35px;

        .already-submit {
            width: 100%;
            height: 45px;
            text-align: center;
            line-height: 45px;
            color: #ffffff;
            font-size: 24px;
        }

        .withdrawal-money {
            width: 100%;
            height: 45px;
            text-align: center;
            line-height: 45px;
            color: #ffffff;
            font-size: 22px;
            margin-top: 10px;

            span {
                color: #b00cb3;
            }
        }

        .attention {
            width: 100%;
            height: 45px;
            text-align: center;
            line-height: 45px;
            color: #b00cb3;
            margin-top: 10px;
        }

        .sure-btn {
            width: 100%;
            height: 45px;
            text-align: left;
            line-height: 45px;
            color: #ffffff;
            padding-left: 180px;
            margin-top: 25px;

            button {
                .mixin_button(112px, 34px, #d4c3b2, #b00cb3);
                border: 1px solid #b00cb3;
            }

            button:hover {
                background: #eceacc;
            }
        }
    }
}
</style>
