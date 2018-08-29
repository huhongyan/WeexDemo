import WeexUi from '@/views/WeexUi.vue'
import mixins from '@/mixins/index'
import * as filters from '@/filter/filter'

//sync(store, router)

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// register global mixins.
Vue.mixin(mixins)

new Vue(Vue.util.extend({ el: '#root' }, WeexUi))
