import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store/index';
import routes from './router/router';

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    strict: false,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop;
            }
            return {x: 0, y: to.meta.savedPosition || 0}
        }
    }
});

new Vue({
    store,
    router
}).$mount('#app');




