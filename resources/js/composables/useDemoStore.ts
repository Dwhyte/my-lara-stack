import { ref } from 'vue';

const toastCount = ref(0);

export function useDemoStore(): {
    toastCount: typeof toastCount;
    incrementToastCount: () => void;
} {
    function incrementToastCount(): void {
        toastCount.value += 1;
    }

    return {
        toastCount,
        incrementToastCount,
    };
}
