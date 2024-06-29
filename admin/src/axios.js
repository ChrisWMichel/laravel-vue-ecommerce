import axios from "axios";
import { useAuthStore } from "./stores/authStore";
//import { useProductStore } from "./stores/productStore";
import router from "./router";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
    const authStore = useAuthStore();
    // const productStore = useProductStore();

    if (authStore.user.token) {
        config.headers.Authorization = `Bearer ${authStore.user.token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // if (error.response) {
        //     console.log("error.response", error.response);
        //     useAuthStore().user.token = null;
        //     sessionStorage.removeItem("token");
        //     router.push("/login");
        // }
        if (error.response && error.response.status === 401) {
            console.log("Authentication error, redirecting to login.");
            const authStore = useAuthStore();
            authStore.user.token = null;
            sessionStorage.removeItem("token");
            router.push("/login");
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
