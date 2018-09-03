<template>
    <div class="wrapper" :style="{height: mainHeight}">
        <image :src="logo" class="logo" />
        <wxc-button text="登录" type="blue"
              @wxcButtonClicked="wxcButtonClicked"></wxc-button>
        <div class="content">
            <wxc-cell v-for="(item, index) in list" :key="(item, index)"
                :title="item.title"
                :has-arrow="true"
                @wxcCellClicked="wxcCellClicked(item, $event)"
                :has-top-border="index == 0"/>
        </div>
        
    </div>
</template>

<script>
import { WxcCell, WxcButton } from 'weex-ui'
import Utils from 'weex-ui/packages/utils'
import { navigatorbBarHeight, getRealScreenHeight } from '../config/Config'
export default {
    components: { WxcCell, WxcButton },
    data() {
        return {
            mainHeight: 0,
            logo:
                'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png',
            list: [
                {
                    title: 'weex-ui',
                    route: 'WeexUi'
                },
                {
                    title: 'Native调试',
                    route: 'Debug'
                },
                {
                    title: '关于样式',
                    route: 'Style'
                }
            ]
        }
    },
    created() {
        this.mainHeight = `${getRealScreenHeight(Utils)}px`
    },
    methods: {
        wxcCellClicked({ route }) {
            // this.msg = `weex.config: ${JSON.stringify(weex.config)}`
            // this.msg = `${this.getBaseUrl()}${route}.js`
            this.jumpWithParams(route)
        },
        wxcButtonClicked() {
            this.jumpInter({ name: 'Login' })
        }
    }
}
</script>

<style lang="less" scoped>
@import '../core/common.less';
.wrapper {
    padding: 20px 0;
}
.logo {
    width: 424px;
    height: 200px;
    margin: 20px;
}
.content {
    padding-top: 30px;
}
</style>
