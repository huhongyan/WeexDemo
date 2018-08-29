<template>
    <div class="wrapper" :style="{height: realHeight}">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" @androidback="function() {$router.back()}"/>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive" @androidback="function() {$router.back()}"/>
    </div>
</template>

<script>
import Utils from 'weex-ui/packages/utils'
import { navigatorbBarHeight, getRealScreenHeight } from './config/Config'
export default {
    name: 'App',
    data() {
        return {
            realHeight: `${getRealScreenHeight(Utils)}px`
        }
    },
    created() {
        debugger
        console.log(this.$route)
    }
}
</script>

<style scoped>
.wrapper {
    width: 750px;
    justify-content: center;
    align-items: center;
}
</style>
