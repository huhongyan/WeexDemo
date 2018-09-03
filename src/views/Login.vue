<template>
    <div class="wrapper" :style="mainStyle">
        <navigation-bar :title="title" />
        <div class="content">
            <div class="input-container">
            <div style="flex-direction: row; margin-top: 50px">
                <text class="icon-text" :style="{fontFamily: 'wxcIconFont'}">{{'\ue666'}}</text>
                <input class="input" v-model="username" ref="username" placeholder="用户名"/>
            </div>
            <div style="flex-direction: row; margin-top: 50px">
                <text class="icon-text" :style="{fontFamily: 'wxcIconFont'}">{{'\ue60e'}}</text>
                <input class="input" v-model="password" type="password" ref="password" placeholder="密码" />
            </div>
            <wxc-button text="登录" 
                        :btn-style="{flex:'1',width:'550px',marginTop: '80px', marginBottom:'40px', backgroundColor: '#3c3f41'}"
                        @wxcButtonClicked="onLogin"></wxc-button>
        </div>
        <text style="margin: 20px;">{{msg}}</text>
        <loading-component height="1334"
                           width="750"
                           border-radius="0"
                           duration="100"
                           :has-overlay="true"
                           :show-close="false"
                           :show="isLoading"
                           :has-animation="true">
        </loading-component>
        </div>
     </div>
</template>

<script>
import { getEntryPageStyle } from '../config/Config'
import Http from '../core/net/http'
import Url from '../core/net/url'
import NavigationBar from '../components/NavigationBar.vue'
import LoadingComponent from '../components/LoadingComponent.vue'
import Utils from 'weex-ui/packages/utils'
import { WxcIcon, WxcButton } from 'weex-ui'
import { addIconFontSupport, getIonFontPath } from '../config/IconConfig'

const modal = weex.requireModule('modal')
const dom = weex.requireModule('dom')
const animation = weex.requireModule('animation')

export default {
    components: { WxcButton, NavigationBar, WxcIcon, LoadingComponent },
    data() {
        return {
            logo: '',
            username: '',
            password: '',
            isLoading: false,
            loadingText: '处理中···',
            mainHeight: 0,
            msg: '111'
        }
    },
    created: function() {
        this.mainStyle = getEntryPageStyle(Utils)
        this.msg = getIonFontPath('../../')
        addIconFontSupport(dom, '../../')
        this.title = 'Login'
    },
    methods: {
        onUserNameChange(event) {
            this.username = event.value
        },
        onPWChange(event) {
            this.password = event.value
        },
        async onLogin() {
            let username = this.username
            let password = this.password
            if (!username) {
                modal.toast({
                    message: '用户名不能为空'
                })
                return
            }
            if (!password) {
                modal.toast({ message: '密码不能为空' })
                return
            }

            this.isLoading = true
            let res = await Http.netFetch(Url.login, 'POST', {
                username,
                password
            })

            if (res && res.result) {
                this.isLoading = false
                modal.toast({
                    message: res.data.msg
                })
                this.msg = JSON.stringify(res.data)

                // let containerEl = this.$refs[`container`]
                // animation.transition(
                //     containerEl,
                //     {
                //         styles: {
                //             transform: `translateY(${Utils.env.getPageHeight()}px)`
                //         },
                //         duration: 1000,
                //         'cubic-bezier': (0.25, 0.46, 0.45, 0.94),
                //         delay: 0
                //     },
                //     () => {
                //         this.reset('/main')
                //     }
                // )
                console.info('resultCallback', res)
            } else {
                this.isLoading = false
                //登录失败
                modal.toast({
                    message: `登录失败 code:${res.code}`
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '../core/common.less';

.content {
    // justify-content: center;
    align-items: center;
    padding-top: 40px;
}
.input-container {
    align-items: center;
    justify-content: center;
    width: 600px;
    background-color: white;
    border-radius: 10px;
    padding: 25px;
    box-shadow: @boxShadow;
}
.icon-text {
    align-items: center;
    color: @themeColor;
    justify-content: center;
    font-size: 55px;
    display: -webkit-box;
    margin-top: 10px;
    margin-right: 25px;
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}
.input {
    font-size: 30px;
    width: 460px;
    border-radius: 12px;
    color: @themeColor;
    height: 72px;
    line-height: 72px;
    padding-left: 30px;
    // align-items: center;
    // justify-content: center;
    border: 2px solid @themeColor;
}
</style>
