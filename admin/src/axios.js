import axios from "axios";
import { useAuthStore } from "./stores/authStore";
import router from "./router";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${useAuthStore().user.token}`;
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            console.log("error.response", error.response);
            useAuthStore().user.token = null;
            sessionStorage.removeItem("token");
            router.push("/login");
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
