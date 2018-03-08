import App from '../page/App.vue';

// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point // （代码分块）, r 就是resolve

const home = r => require.ensure([], () => r(require('../page/home')), 'home');
const balance = r => require.ensure([], () => r(require('../page/balance')), 'balance');
const login = r => require.ensure([], () => r(require('../page/login')), 'login');
const shop = r => require.ensure([], () => r(require('../page/shop')), 'shop');
const city = r => require.ensure([], () => r(require('../page/city')), 'city');

// 懒加载
export default [{
    path: '/',
    component: App, // 顶层路由，app.html
    children: [ // 二级路由。对应App.vue
        // 地址为空时跳转home页面
        {
            path: '',
            redirect: '/home'
        },
        //首页城市列表页
        {
            path: '/home',
            component: home
        },
        //当前选择城市页
        {
            path: '/city/:cityid',
            component: city
        },
        {
            path: '/balance',
            component: balance
        }, {
            path: '/login',
            component: login
        }, {
            path: '/shop',
            component: shop
        }]
}];