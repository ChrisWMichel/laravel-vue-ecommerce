import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/auth/Login.vue";
import App from "../App.vue";
import RequestPassword from "../views/auth/RequestPassword.vue";
import ResetPassword from "../views/auth/ResetPassword.vue";
import AuthLayout from "../components/auth/AuthLayout.vue";
import products from "../views/Products/products.vue";
import { useAuthStore } from "../stores/authStore";
import notFound from "../views/notFound.vue";

const routes = [
    {
        path: "/app",
        name: "app",
        component: AuthLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: "dashboard",
                name: "app.dashboard",
                component: Dashboard,
            },
            {
                path: "products",
                name: "app.products",
                component: products,
            },
        ],
    },

    {
        path: "/login",
        name: "login",
        meta: { requiresGuest: true },
        component: Login,
    },
    {
        path: "/request-password",
        name: "requestPassword",
        meta: { requiresGuest: true },
        component: RequestPassword,
    },
    {
        path: "/reset-password/:token",
        name: "resetPassword",
        meta: { requiresGuest: true },
        component: ResetPassword,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: notFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !useAuthStore().user.token) {
        next({ name: "login" });
    } else if (to.meta.requiresGuest && useAuthStore().user.token) {
        next({ name: "app.dashboard" });
    } else {
        next();
    }
});

export default router;
