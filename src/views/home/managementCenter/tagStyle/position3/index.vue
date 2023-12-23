<template>
    <section>
        <aside>

        </aside>
        <article>
            <header></header>
            <main>
                <div class="centerBox">
                    <div class="contentBox">

                    </div>
                </div>
                <div class="waterBox"></div>
            </main>
        </article>
        <div style="clear: both;"></div>
    </section>
</template>
<!--
    使宽高占满父盒子：
        position: absolute;
        inset: 0px;
        或
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        原理：子盒子用绝对定位时，宽高100% == 父盒子宽高
        补充：这原理能用于父盒子宽高未知，由内容撑开

    PC端自适应用这种
    别用父盒子padding-left，子右盒子就能用width: 100%，子左盒子用定位
 -->
<style lang="less">
section {
    width: 100%;
    height: 100%;
    aside {
        width: 200px;
        height: 100%;
        float: left;
        background: greenyellow;
    }
    article {
        width: calc(100% - 200px);
        height: 100%;
        float: right;
        header {
            width: 100%;
            height: 50px;
            background: lightpink;
        }
        main {
            width: 100%;
            height: calc(100% - 50px);
            position: relative;
            .centerBox {
                width: 100%;
                height: 100%;
                overflow: auto;
                .contentBox {
                    width: 100%;
                    height: 1500px;
                    background: linear-gradient(180deg, #edf7ff 6.51%, #fff 53.67%, #fbfdff 82.03%, #f2faff 93.87%);
                }
            }
            .waterBox {
                position: absolute;
                inset: 0px;
                background: rgba(0, 0, 0, 0.1);
                pointer-events: none;
            }
        }
    }
}
</style>
