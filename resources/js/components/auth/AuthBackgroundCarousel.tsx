import { useEffect, useState } from 'react';

import { loginCarouselGradients, loginCarouselImages } from '@/features/auth/login-carousel';

const fadeDurationMs = 900;
const intervalMs = 5500;

export default function AuthBackgroundCarousel({ paused = false }: { paused?: boolean }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (paused || loginCarouselImages.length <= 1) {
            return;
        }

        const intervalId = window.setInterval(() => {
            setActiveIndex((current) => (current + 1) % loginCarouselImages.length);
        }, intervalMs);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [paused]);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {loginCarouselImages.map((image, index) => (
                <div
                    key={image}
                    className="absolute inset-0 overflow-hidden transition-opacity"
                    style={{
                        opacity: index === activeIndex ? 1 : 0,
                        background: loginCarouselGradients[index],
                        transitionDuration: `${fadeDurationMs}ms`,
                    }}
                >
                    <img src={image} alt="" className="h-full w-full scale-[1.04] object-cover opacity-85" decoding="async" />
                </div>
            ))}
        </div>
    );
}
