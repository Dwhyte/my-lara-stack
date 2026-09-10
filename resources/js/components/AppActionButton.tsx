import { Link } from '@inertiajs/react';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AppActionButtonProps = {
    children: ReactNode;
    disabled?: boolean;
    loading?: boolean;
    type?: 'button' | 'submit';
    href?: string;
    className?: string;
    onClick?: () => void;
};

export default function AppActionButton({
    children,
    disabled,
    loading,
    type = 'button',
    href,
    className,
    onClick,
}: AppActionButtonProps) {
    const classes = cn('h-11 w-full rounded-xl', className);

    if (href) {
        return (
            <Button asChild className={classes} disabled={disabled || loading}>
                <Link href={href}>{children}</Link>
            </Button>
        );
    }

    return (
        <Button type={type} className={classes} disabled={disabled || loading} onClick={onClick}>
            {children}
        </Button>
    );
}
