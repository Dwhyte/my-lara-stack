import type { ReactNode } from 'react';

import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';

export type BottomSheetSize = null | 'large' | 'full';

type MobileBottomSheetProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
    dismissible?: boolean;
    size?: BottomSheetSize;
};

export default function MobileBottomSheet({
    open,
    onOpenChange,
    children,
    dismissible = true,
    size = null,
}: MobileBottomSheetProps) {
    if (size === 'full') {
        if (!open) {
            return null;
        }

        return (
            <div
                className="fixed inset-0 z-50 flex h-dvh flex-col overflow-hidden bg-background pt-safe pb-safe outline-none"
                aria-modal="true"
                role="dialog"
                onClick={(event) => {
                    const target = event.target as HTMLElement | null;

                    if (target?.closest('button, a, [role="button"], input, textarea, select, label')) {
                        return;
                    }

                    onOpenChange(false);
                }}
            >
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
            </div>
        );
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange} dismissible={dismissible}>
            <DrawerContent
                className={cn(size === 'large' && 'h-[92dvh] max-h-[100dvh]')}
            >
                <DrawerTitle className="sr-only">Sheet</DrawerTitle>
                <DrawerDescription className="sr-only">Bottom sheet</DrawerDescription>
                <div className="flex min-h-0 flex-col overflow-hidden">{children}</div>
            </DrawerContent>
        </Drawer>
    );
}
