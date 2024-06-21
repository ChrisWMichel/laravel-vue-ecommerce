import { defineStore } from "pinia";
import { reactive } from "vue";
import axiosClient from "../axios";

export const useAuthStore = defineStore("auth", () => {
    const user = reactive({
        token: sessionStorage.getItem("token") || null,
        data: {},
    });

    function login(data) {
        return axiosClient
            .post("/login", data)
            .then((response) => {
                user.token = response.data.token;
                user.data = response.data.user;
                sessionStorage.setItem("token", user.token);
                return user.data;
                //router.push("/");
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function logout() {
        user.token = null;
        sessionStorage.removeItem("token");
    }

    function setToken(token) {
        user.token = token;
        if (token) {
            sessionStorage.setItem("token", token);
        } else {
            sessionStorage.removeItem("token");
        }
    }

    return {
        user,
        login,
        logout,
        setToken,
    };
});
