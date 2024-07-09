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

    const updateProduct = async (id, product) => {
        try {
            if (product.image instanceof File) {
                const formData = new FormData();
                formData.append("name", product.title);
                formData.append("price", product.price);
                formData.append("description", product.description);
                formData.append("image", product.image);
                formData.append("_method", "PUT");
                // const response = await axiosClient.put(`/products/${id}`, formData, {
                //     headers: {
                //         "Content-Type": "multipart/form-data",
                //     },
                // });
                // return response.data
            } else {
                product._method = "PUT";
            }
            return axiosClient.post(`/products/${id}`, product);
        } catch (error) {
            console.error(error);
        }
    };

    const addProduct = async (product) => {
        try {
            if (product.image instanceof File) {
                console.log("product.image", product.image);
                const formData = new FormData();
                formData.append("title", product.title);
                formData.append("price", product.price);
                formData.append("description", product.description);
                formData.append("image", product.image);
                return axiosClient.post("/products", formData);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return {
        products,
        getProducts,
        updateProduct,
        addProduct,
    };
});
