import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import NewsList from './components/NewsLIst'

Vue.use(VueRouter)

let routes = [{
    path: '/',
    component: NewsList
}]

let router = new VueRouter({
    routes
})

new Vue({
    el: '#app',
    components: {
        App
    },
    router
})