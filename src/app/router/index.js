import Vue from 'vue'
import Router from 'vue-router'
import Home from '@page/home/index'
import Detail from '@page/detail/index'
// import Detail2 from '@page/detail2/index'
// import Store from '@page/store/index'
// import My from '@page/my/index'

Vue.use(Router)

export const commonRouter = [
    {
        path: '/',
        component: Home
    },
    /* {
        path: '/store',
        component: Store
    },
    {
        path: '/my',
        component: My
    }, */
    {
        path: '/detail/editor/:id',
        component: Detail
    }
]

export default new Router({
    scrollBehavior: () => ({
        y: 0
    }),
    routes: commonRouter
})
