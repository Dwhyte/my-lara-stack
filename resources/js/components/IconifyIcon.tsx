import { Icon } from '@iconify/react';

type IconifyIconProps = {
    name: string;
    className?: string;
};

export default function IconifyIcon({ name, className }: IconifyIconProps) {
    return <Icon icon={name} className={className} />;
}
