<template>
    <section id="video">
        <div class="video-dialog" v-show="dialog_show">
            <div class="video-header">
                <el-icon><Close  @click="closeWay()"/></el-icon>
            </div>
            <div class="video-body" @mouseenter="enterWay" @mouseleave="leaveWay">
                <video :poster="require('./img/center02.png')" :src="require('@sky/rafaelDesign/static/video/58244a10da66c5401.mp4')"
                 :controls="true" width="100%" :autoplay="false" ref="videoRef"
                 :onPlay="playActive" :onPause="pauseActive" @playing="playingWay" @ended="endedWay">
                </video>
                <img
                    v-if="!play_active"
                    :src="require('./img/sponsor_star.png')"
                    @click="()=>{playWay()}"
                >
                <img
                    v-if="mouse_active && play_active"
                    :src="require('./img/sponsor_stop.png')"
                    @click="()=>{pauseWay()}"
                >
            </div>
        </div>
    </section>
</template>

<script>
/*
:poster="图片路径"
在视频加载期间和用户没有播放视频时显示，提升用户体验

:src="视频路径"
用于指定视频文件的 URL 地址

:controls="true"
是否显示默认的控制栏

:autoplay="false"
是否立即自动播放


浏览器兼容
<source> 标签用于为视频指定多个不同源的视频文件
浏览器会根据自己的支持情况,选择性加载第一个可支持播放的视频源
<video>
    <source src="video.mp4" type="video/mp4">
    <source src="video.ogg" type="video/ogg">
    <source src="video.webm" type="video/webm">
</video>

source 标签的属性:
- src - 视频文件的 URL
- type - 视频格式的 MIME 类型
- media - 媒体查询条件,指定在什么条件下使用该源
- sizes - 不同尺寸的视频 URL
- caption - 为视频源指定字幕文件
*/
export default {
    data(){
        return{
            dialog_show: true,
            // 播放状态
            play_active: false,
            // 鼠标移入移出状态
            mouse_active: false
        }
    },
    methods: {
        closeWay(){
            this.dialog_show = false;
        },
        // 播放视频
        playWay() {
            this.$refs.videoRef.play();
        },
        // 暂停视频
        pauseWay() {
            this.$refs.videoRef.pause();
        },
        playActive() {
            console.log("开始播放回调");
            this.play_active = true;
        },
        pauseActive() {
            console.log("停止播放回调");
            this.play_active = false;
        },
        playingWay() {
            console.log('视频开始播放');
        },
        endedWay() {
            console.log('视频播放结束');
        },
        // 鼠标移入
        enterWay() {
            this.mouse_active = true;
        },
        // 鼠标移出
        leaveWay() {
            this.mouse_active = false;
        }
    }
}
</script>

<style lang="less" scoped>
#video{
    .video-dialog{
        width: 600px;
        margin: 100px auto;
        border-radius: 4px;
        background: rgba(45,45,45,0.4);
        .video-header{
            width: 100%;
            height: 30px;
            background: rgba(45,45,45,0.4);
            position: relative;
            i{
                width: 25px;
                height: 25px;
                padding: 5px;
                position: absolute;
                top: 2px;
                right: 8px;
                color: white;
            }
        }
        .video-body {
            height: 340px;
            position: relative;
            video {
                width: 100%;
                height: 100%;
            }
            img {
                width: 66px;
                height: 66px;
                position: absolute;
                left: 50%;
                top: 50%;
                margin-left: -33px;
                margin-top: -33px;
            }
        }
    }
}
</style>

