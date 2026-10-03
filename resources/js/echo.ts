import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export type ReverbClientConfig = {
    key: string;
    host: string;
    port: number;
    scheme: string;
};

declare global {
    interface Window {
        Pusher: typeof Pusher;
        Echo?: Echo<'reverb'>;
        __reverb?: ReverbClientConfig;
    }
}

function isLoopbackHost(host: string): boolean {
    const hostLower = host.trim().toLowerCase();

    return hostLower === 'localhost' || hostLower === '127.0.0.1' || hostLower === '[::1]' || hostLower === '0.0.0.0';
}

function readCookie(name: string): string | null {
    const pattern = new RegExp(`(?:^|;\\s*)${name}=([^;]+)`);
    const match = document.cookie.match(pattern);

    return match !== null ? decodeURIComponent(match[1]) : null;
}

function csrfToken(): string {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '';
}

function broadcastAuthHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
        'X-CSRF-TOKEN': csrfToken(),
        'X-Requested-With': 'XMLHttpRequest',
        Accept: 'application/json',
    };

    const xsrfCookie = readCookie('XSRF-TOKEN');

    if (xsrfCookie !== null) {
        headers['X-XSRF-TOKEN'] = xsrfCookie;
    }

    return headers;
}

function resolveReverbConfig(): ReverbClientConfig {
    if (window.__reverb?.key) {
        return window.__reverb;
    }

    const pageIsSecure = window.location.protocol === 'https:';

    return {
        key: import.meta.env.VITE_REVERB_APP_KEY,
        host: import.meta.env.VITE_REVERB_HOST ?? window.location.hostname,
        port: Number(import.meta.env.VITE_REVERB_PORT ?? 8080),
        scheme: import.meta.env.VITE_REVERB_SCHEME ?? (pageIsSecure ? 'https' : 'http'),
    };
}

function resolveSocketHost(host: string): string {
    if (window.location.protocol !== 'https:' || !isLoopbackHost(host)) {
        return host;
    }

    if (isLoopbackHost(window.location.hostname)) {
        return host;
    }

    return window.location.hostname;
}

let echo: Echo<'reverb'> | undefined;

if (typeof window !== 'undefined') {
    const reverb = resolveReverbConfig();
    const wsHost = resolveSocketHost(reverb.host);
    const forceTLS = reverb.scheme === 'https' && !isLoopbackHost(wsHost);

    window.Pusher = Pusher;

    if (reverb.key) {
        echo = new Echo({
            broadcaster: 'reverb',
            key: reverb.key,
            wsHost,
            wsPort: reverb.port,
            wssPort: reverb.port,
            forceTLS,
            enabledTransports: ['ws', 'wss'],
            authEndpoint: '/broadcasting/auth',
            auth: {
                headers: broadcastAuthHeaders(),
            },
        });

        window.Echo = echo;
    }
}

export { echo };
export default echo;
