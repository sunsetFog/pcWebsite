<template>
    <section id="printEditor">
        <CodeEditor v-model="json4"></CodeEditor>
        <!-- <CodeEditor :jsonString="routerList"></CodeEditor> -->
    </section>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex';
import CodeEditor from '@/components/printEditor/index.vue';
// import CodeEditor from '@/components/printEditor/jsonPrint2.vue';
export default {
    name: "printEditor",
    components: { CodeEditor },
    data() {
        return {

        }
    },
    computed:{ // 使用vuex
        ...mapGetters(['routerList']),
        json4() {
            return JSON.stringify(this.routerList, null, 4)
        }
    },
}
</script>

<style lang="less" scoped>
#printEditor {

}
</style>

