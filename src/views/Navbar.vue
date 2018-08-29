<template>
    <div class="wrapper" :style="{height: mainHeight}">
        <image :src="logo" class="logo" />
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
import { WxcCell } from 'weex-ui'
import Utils from 'weex-ui/packages/utils'
import { navigatorbBarHeight, getRealScreenHeight } from '../config/Config'
export default {
    components: { WxcCell },
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
            this.jumpWithParams(route)
        }
    }
}
</script>

<style lang="less" scoped>
@import '../core/common.less';

.logo {
    width: 424px;
    height: 200px;
    margin: 20px;
}
</style>
