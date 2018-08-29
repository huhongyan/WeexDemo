<template>
    <div class="wrapper" :style="mainStyle">
        <navigation-bar :title="title"></navigation-bar>
        <div class="content">
            <text>weex debug 调试页面时，start页面查看时，报Vue未定义等各种框架的问题</text>
            <text>1，可能是build的时候报错，手动build，会提示相关错误。</text>
            <text>2，在页面上直接引入router的文件，会导致找不到Vue</text>
            <text>weex debug 之后，扫描无反应：查看是否在同一局域网。</text>
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
        this.title = 'Debug'
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

