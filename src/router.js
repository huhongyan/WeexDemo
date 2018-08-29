/*global Vue*/
import Router from 'vue-router'
import Navbar from '@/views/Navbar.vue'
import WeexUi from '@/views/WeexUi.vue'
import Debug from '@/views/Debug.vue'
import Style from '@/views/Style.vue'

Vue.use(Router)

module.exports = new Router({
    routes: [
        {
            path: '/',
            name: 'Navbar',
            component: Navbar
            // meta: {
            //     keepAlive: true
            // }
        },
        {
            path: '/ui',
            name: 'WeexUi',
            component: WeexUi
        },
        {
            path: '/debug',
            name: 'Debug',
            component: Debug
        },
        {
            path: '/style',
            name: 'Style',
            component: Style
        }
    ]
})
