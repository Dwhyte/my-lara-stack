import { ref } from 'vue';

const message = ref('');
const color = ref<'success' | 'error' | 'warning' | 'info' | 'primary'>('primary');
const visible = ref(false);

export function useSnackbar() {
    function showSnackbar(
        nextMessage: string,
        nextColor: 'success' | 'error' | 'warning' | 'info' | 'primary' = 'primary',
    ): void {
        message.value = nextMessage;
        color.value = nextColor;
        visible.value = true;
    }

    function hideSnackbar(): void {
        visible.value = false;
    }

    return {
        message,
        color,
        visible,
        showSnackbar,
        hideSnackbar,
    };
}
