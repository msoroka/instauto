import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login";
import Register from "../views/Register";
import Tasks from "../views/Tasks";
import User from "../views/User";
import InstagramProfile from "../views/InstagramProfile";

import store from '../store/index'

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/tasks",
        name: "tasks",
        component: Tasks,
    },
    {
        path: "/profile",
        name: "profile",
        component: InstagramProfile,
    },
    {
        path: "/user",
        name: "user",
        component: User,
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.state.user.authorized) {
            next();
        }else {
            router.push({name: 'login'});
        }
    } else {
        next();
    }
});

export default router;
