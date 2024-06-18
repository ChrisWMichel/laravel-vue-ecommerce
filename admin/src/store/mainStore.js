import { defineStore } from "pinia";

export const useMainStore = defineStore("main", () => {
    const test = "Hello World";

    return {
        test,
    };
});
