import { Link, router, usePage } from '@inertiajs/react';

import IconifyIcon from '@/components/IconifyIcon';
import { Button } from '@/components/ui/button';
import type { AppSharedProps } from '@/types/inertia';

type UserMenuSheetProps = {
    onClose: () => void;
};

export default function UserMenuSheet({ onClose }: UserMenuSheetProps) {
    const { props } = usePage<AppSharedProps>();
    const userName = props.auth.user?.name ?? 'Account';

    return (
        <div className="flex flex-col gap-4 p-6">
            <div>
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Signed in as</p>
                <p className="text-foreground mt-1 text-lg font-semibold">{userName}</p>
            </div>

            <div className="border-border bg-card flex flex-col rounded-lg border">
                <Link
                    href="/settings/profile"
                    className="hover:bg-muted flex items-center gap-3 px-3 py-2.5 text-sm"
                    onClick={onClose}
                >
                    <IconifyIcon name="lucide:user" className="size-[18px]" />
                    Profile
                </Link>
                <Link
                    href="/settings/security"
                    className="hover:bg-muted flex items-center gap-3 px-3 py-2.5 text-sm"
                    onClick={onClose}
                >
                    <IconifyIcon name="lucide:shield" className="size-[18px]" />
                    Security
                </Link>
                <Link
                    href="/settings/appearance"
                    className="hover:bg-muted flex items-center gap-3 px-3 py-2.5 text-sm"
                    onClick={onClose}
                >
                    <IconifyIcon name="lucide:sun-moon" className="size-[18px]" />
                    Appearance
                </Link>
            </div>

            {props.auth.user ? (
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                        router.post('/logout');
                    }}
                >
                    Log out
                </Button>
            ) : (
                <p className="text-muted-foreground text-sm">
                    <Link href="/login" className="text-primary hover:underline" onClick={onClose}>
                        Sign in
                    </Link>{' '}
                    to access account settings.
                </p>
            )}
        </div>
    );
}
