import { useState } from 'react';

export function useSendMagicLink() {
    const [isPending, setIsPending] = useState(false);

    async function send(email: string, name?: string): Promise<void> {
        void email;
        void name;
        setIsPending(true);

        await new Promise((resolve) => {
            setTimeout(resolve, 300);
        });

        setIsPending(false);
    }

    return {
        send,
        isPending,
    };
}

export function useInitiateGoogleOAuth() {
    const [isPending, setIsPending] = useState(false);

    async function open(): Promise<void> {
        setIsPending(true);

        await new Promise((resolve) => {
            setTimeout(resolve, 300);
        });

        setIsPending(false);
    }

    return {
        open,
        isPending,
    };
}
