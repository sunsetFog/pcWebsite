<template>
    <section>
        <div class="regular"></div>
    </section>
</template>
<!--
    position: fixed;固定定位  以浏览器窗口为参考，脱离文档

    使宽高占满浏览器窗口：
    inset: 0px; 等价于 top: 0; right: 0; bottom: 0; left: 0;

    inset: 1px 2px 3px; 等价于 top: 1px; right: 2px; bottom: 3px; left: 2px;
 -->
<style lang="less">
section {
    .regular {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(121, 132, 158, 0.3);
    }
}
</style>
