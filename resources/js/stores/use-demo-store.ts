import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useDemoStore = defineStore('demo', () => {
    const toastCount = ref(0);

    const incrementToastCount = () => {
        toastCount.value += 1;
    };

    const reset = () => {
        toastCount.value = 0;
    };

    return {
        toastCount,
        incrementToastCount,
        reset,
    };
});
