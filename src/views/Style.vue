<template>
    <div class="wrapper" :style="mainStyle">
        <navigation-bar :title="title">
            <wxc-icon name="refresh" style="color: #FFFFFF;" @wxcIconClicked="onRightButtonClick" />
        </navigation-bar>
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
import { WxcIcon } from 'weex-ui'
const modal = weex.requireModule('modal')
export default {
    components: { NavigationBar, WxcIcon },
    created: function() {
        this.mainStyle = getEntryPageStyle(Utils)
        this.title = 'Style'
    },
    methods: {
        onRightButtonClick() {
            modal.toast({ message: 'click rightButton!', duration: 2 })
        }
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
