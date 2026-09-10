import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppearance } from '@/hooks/use-appearance';
import type { Appearance } from '@/lib/appearanceResolve';
import { cn } from '@/lib/utils';

const options: Array<{ value: Appearance; label: string }> = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' },
];

export default function AppearancePage() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <div className="app-page-shell max-w-lg">
            <h1 className="app-page-title">Appearance</h1>
            <p className="app-page-lead">Choose how this app looks on this device.</p>

            <Card className="mt-6">
                <CardContent className="flex gap-2 pt-6">
                    {options.map((option) => (
                        <Button
                            key={option.value}
                            type="button"
                            variant={appearance === option.value ? 'default' : 'outline'}
                            className={cn('flex-1')}
                            onClick={() => updateAppearance(option.value)}
                        >
                            {option.label}
                        </Button>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
