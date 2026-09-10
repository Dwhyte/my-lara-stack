import type { ReactNode } from 'react';

import MobileBottomSheet from '@/components/adaptive/MobileBottomSheet';
import type { BottomSheetSize } from '@/components/adaptive/MobileBottomSheet';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from '@/components/ui/dialog';
import { useBreakpoint } from '@/hooks/use-breakpoint';

type AdaptiveOverlayProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    children: ReactNode;
    title?: string;
    description?: string;
    size?: BottomSheetSize;
};

export default function AdaptiveOverlay({
    open,
    onOpenChange,
    children,
    title = 'Dialog',
    description = 'Dialog',
    size = null,
}: AdaptiveOverlayProps) {
    const { isDesktop } = useBreakpoint();

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                    {children}
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <MobileBottomSheet open={open} onOpenChange={onOpenChange} size={size}>
            {children}
        </MobileBottomSheet>
    );
}
