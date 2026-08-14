import { ref } from 'vue';

export function useSendMagicLink() {
    const isPending = ref(false);

    async function send(email: string, name?: string): Promise<void> {
        void email;
        void name;
        isPending.value = true;

        await new Promise((resolve) => {
            setTimeout(resolve, 300);
        });

        isPending.value = false;
    }

    return {
        send,
        isPending,
    };
}

export function useInitiateGoogleOAuth() {
    const isPending = ref(false);

    async function open(): Promise<void> {
        isPending.value = true;

        await new Promise((resolve) => {
            setTimeout(resolve, 300);
        });

        isPending.value = false;
    }

    return {
        open,
        isPending,
    };
}
