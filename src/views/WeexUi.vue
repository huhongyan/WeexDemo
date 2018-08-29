<template>
    <div class="wrapper" :style="mainStyle">
        <navigation-bar :title="title"></navigation-bar>
        <div class="content">
            <text>WEEX提供了weex.config.env和WXEnvironment两种方法获取当前运行时环境</text>
            <text>通过WXEnvironment.platform来确定代码运行在哪个平台</text>
        </div>
     </div>
</template>

<script>
import { getEntryPageStyle } from '../config/Config'
import NavigationBar from '../components/NavigationBar.vue'
import Utils from 'weex-ui/packages/utils'
export default {
    components: { NavigationBar },
    created: function() {
        this.mainStyle = getEntryPageStyle(Utils)
        this.title = 'weex-ui'
        // this.webH =
        //     Utils.env.getScreenHeight() -
        //     Config.navigatorbBarHeight -
        //     Config.statusHeight
        // if (Utils.env.isIPhoneX()) {
        //     this.webH = this.webH - 44
        // }
    }
}
</script>

<style lang="less" scoped>
@import '../core/common.less';
.content {
    padding: 20px;
    background-color: #fff;
}
</style>
