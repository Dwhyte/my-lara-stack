import { useEffect, useState } from 'react';

const MD_QUERY = '(min-width: 840px)';

export function useBreakpoint(): { isDesktop: boolean } {
    const [isDesktop, setIsDesktop] = useState(() => {
        if (typeof window === 'undefined') {
            return false;
        }

        return window.matchMedia(MD_QUERY).matches;
    });

    useEffect(() => {
        const media = window.matchMedia(MD_QUERY);
        const onChange = (): void => {
            setIsDesktop(media.matches);
        };

        media.addEventListener('change', onChange);
        onChange();

        return () => {
            media.removeEventListener('change', onChange);
        };
    }, []);

    return { isDesktop };
}
