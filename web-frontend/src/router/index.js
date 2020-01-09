import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login";
import Register from "../views/Register";
import Calendar from "../views/Tasks/Calendar";
import User from "../views/User";
import InstagramProfile from "../views/InstagramProfile";
import Create from "../views/Tasks/Create";
import Edit from "../views/Tasks/Edit";

// import store from '../store/index'

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
        component: Login,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
            requiresAuth: false
        }
    },
    {
        path: "/calendar",
        name: "calendar",
        component: Calendar,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/edit-task/:taskId",
        name: "edit-task",
        component: Edit,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/create-task",
        name: "create-task",
        component: Create,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/profile",
        name: "profile",
        component: InstagramProfile,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/user",
        name: "user",
        component: User,
        meta: {
            requiresAuth: true
        }
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         if (store.state.user.authorized) {
//             next();
//         } else {
//             router.push({name: 'login'});
//         }
//     } else {
//         if (store.state.user.authorized) {
//             router.push({name: 'calendar'});
//         }
//         next();
//     }
// });

export default router;
