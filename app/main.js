import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import "vueify/lib/insert-css" // required for .vue file <style> tags

Vue.config.productionTip = false
Vue.use(Vuex);

const store = new Vuex.Store({
state: {
    count: 0
},
mutations: {
    increment (state) {
    state.count++
    }
}
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
