import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Login from "../views/auth/Login.vue";
import App from "../App.vue";
import RequestPassword from "../views/auth/RequestPassword.vue";
import ResetPassword from "../views/auth/ResetPassword.vue";
import AuthLayout from "../components/auth/AuthLayout.vue";

const routes = [
    {
        path: "/app",
        name: "app",
        component: AuthLayout,
        children: [
            {
                path: "dashboard",
                name: "app.dashboard",
                component: Dashboard,
            },
        ],
    },

    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/request-password",
        name: "requestPassword",
        component: RequestPassword,
    },
    {
        path: "/reset-password/:token",
        name: "resetPassword",
        component: ResetPassword,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
