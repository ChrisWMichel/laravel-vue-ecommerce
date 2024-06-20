import { defineStore } from "pinia";
import { reactive } from "vue";

export const useMainStore = defineStore("main", () => {
    const user = reactive({
        token: null,
        data: {},
    });

    return {
        user,
    };
});
