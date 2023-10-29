<template>
    <section class="bird2">
        一个项目两个平台
    </section>
</template>

<script>
export default {
    name: 'platformUnit',
    created() {
        console.log("--root_platform--", root_platform);
    }
}
</script>

<style lang="scss">
.bird2 {
    @if $platform == 'bd' {
        color: rosybrown;
    }
    @if $platform == 'tb' {
        color: greenyellow;
    }
    @include platform-bd() {
        background: rgb(77, 76, 76);
    }
    @include platform-tb() {
        background: rgb(179, 134, 52);
    }
}
</style>
