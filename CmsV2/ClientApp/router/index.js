import Vue from 'vue';
import VueRouter from 'vue-router';
const _import = require('./_import_sync');
import App from '../components/app.vue';//các chức năng cũ
import AppV2 from '../components/app-v2.vue';//layout giao diện mới
//import AppCalendar from '../components/app-calendar.vue';//trang calendar mới
import app_collaborator from '../components/empty.vue';
import AppBasic from '../components/app-basic.vue';
import CONSTANTS from '../core/utils/constants';
//import store from '../vuex/index';
Vue.use(VueRouter);

let _routers = [
    {
        path:'/',
        component: AppV2,
        children:[
            // calendar
            {
                path: '/',
                component: _import('dashboard/index'),
                meta: { requiresAuth: true }
            },
            {
                path: '/users',
                component: _import('user/index'),
                meta: { requiresAuth: true }
            },
            {
                path: '/roles',
                component: _import('role/index'),
                meta: { requiresAuth: true }
            },
            {
                path: '/reports',
                component: _import('report/index'),
                meta: { requiresAuth: true }
            },
            {
                path: '/reports/detail',
                component: _import('report/detail'),
                meta: { requiresAuth: true }
            },
            {
                path: '/reports/input-data',
                component: _import('report/input-data'),
                meta: { requiresAuth: true }
            },
            {
                path: '/test',
                component: _import('report/test-input-form'),
                meta: { requiresAuth: true }
            },
        ]
    },
    {        
        path: '/',
        component: App,
        children: [
            {
                path: '/language',
                component: _import('language/index'),
                meta: { requiresAuth: true }
            },
            {
                path: '/branch',
                component: _import('companybranch/index'),
                meta: { requiresAuth: true }
            },
            {
                path: '/services',
                component: _import('companyservices/index'),
                meta: { requiresAuth: true }
            },
            {
                path: '/company/:id',
                component: _import('company/edit'),
                meta: { requiresAuth: true }
            },
            {
                path: '/es',
                component: _import('essetup/index'),
                meta: { requiresAuth: true }
            },
            {
                path: '/system-type',
                component: _import('systemtype/index'),
                meta: { requiresAuth: true }
            },
            {
                path: '/logout',
                component: _import('login/logout'),
                meta: { requiresAuth: true }
            },
            {
                path: '/log-action',
                component: _import('logaction/list'),
                meta: { requiresAuth: true }
            },
            {
                path: '/location',
                component: _import('location/index'),
                meta: { requiresAuth: true }
            },
            {
                path: '/version-application',
                component: _import('version-application/index'),
                meta: { requiresAuth: true }
            }
        ]
    },    
    {
        path: '/',
        component: AppBasic,
        children: [
            {
                path: '/login',
                component: _import('login/index')
            }
        ]
    },
    {
        path: '/ctv',
        component: app_collaborator,
        meta: { requiresAuth: true }
    },
    {
        path: '*',
        component: App,
        children: [
            {
                path: '/',
                component: _import('_shared/404')
            }
        ]
    }
];
const router = new VueRouter({
    mode: 'history',
    errorHandler(to, from, next, error) {
        console.log(error);
    },
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    },
    routes: _routers
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        try {
            if (!process.env.VUE_ENV) {
                if (localStorage.getItem(CONSTANTS.AUTH_TOKEN)) return next();
                else router.push({ path: '/login', query: { returnUrl: to.fullPath } });
            } else {
                next();
            }
        } catch (e) {
            console.log(e);
            next();
        }
    } else {
        next();
    }
});

export default router;
