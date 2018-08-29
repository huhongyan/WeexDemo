<template>
    <div class="title" :style="{height: nvheight}">
        <wxc-minibar background-color="#009ff0"
                   text-color="#FFFFFF">
            <wxc-icon :name="leftIcon" slot="left" :style="{color: '#FFFFFF', fontSize: '60px'}" @wxcIconClicked="onClick"></wxc-icon>
            <text style="font-size: 40px; color: #FFFFFF;" slot="middle">{{title}}</text>
            <slot slot="right" />
        </wxc-minibar>
    </div>
</template>

<script>
import { WxcMinibar, WxcIcon } from 'weex-ui'
import * as Config from '../config/Config'

export default {
    components: { WxcMinibar, WxcIcon },
    data: () => ({
        nvheight: `${Config.navigatorbBarHeight}px`
    }),
    props: {
        onLeftButtonClick: { type: Function, default: function() {} },
        title: { type: String, default: '' },
        leftIcon: { type: String, default: 'back' }
    },
    methods: {
        onClick() {
            this.onLeftButtonClick()
            this.toBack()
        }
    }
}
</script>

<style lang="less" >
@import '../core/common.less';
.title {
    width: 750px;
    align-items: center;
    background-color: @themeColor;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
    border-bottom: 0.5px @containerColor;
}
</style>
<style scoped>
</style>