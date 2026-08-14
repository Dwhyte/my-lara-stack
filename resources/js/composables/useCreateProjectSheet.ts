import { useSnackbar } from '@/composables/useSnackbar';

export function useCreateProjectSheet() {
    const { showSnackbar } = useSnackbar();

    function openCreateProjectSheet(): void {
        showSnackbar('Create action is a starter-kit placeholder.', 'info');
    }

    return {
        openCreateProjectSheet,
    };
}
