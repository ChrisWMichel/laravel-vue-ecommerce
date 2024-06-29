import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import axiosClient from "../axios";

export const useProductStore = defineStore("product", () => {
    const products = {
        data: [],
    };

    const getProducts = async (
        url,
        search = "",
        perPage = 10,
        sortField,
        sortDirection
    ) => {
        url = url || "/products";
        try {
            const response = await axiosClient.get(url, {
                params: {
                    search,
                    perPage,
                    sortField,
                    sortDirection,
                },
            });
            products.data = response.data;
            return response.data.data;
        } catch (error) {
            console.error(error);
        }
    };

    return {
        products,
        getProducts,
    };
});
