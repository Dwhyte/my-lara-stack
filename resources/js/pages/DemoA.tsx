import { toast } from 'sonner';

import { demoB } from '@/actions/App/Http/Controllers/DemoController';
import AppActionButton from '@/components/AppActionButton';
import IconifyIcon from '@/components/IconifyIcon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useAppearance } from '@/hooks/use-appearance';
import { useDemoStore } from '@/stores/use-demo-store';

const stackItems = [
    { label: 'Laravel', description: 'Handles routing, validation, and serves the initial HTML' },
    { label: 'Inertia.js', description: 'Bridges Laravel controllers with React page components' },
    { label: 'React', description: 'Renders interactive UI on the client' },
    { label: 'Vite', description: 'Bundles and serves assets with HMR in development' },
    { label: 'Tailwind CSS', description: 'Utility-first layout and styling' },
    { label: 'shadcn/ui', description: 'Open-code primitives styled with project tokens' },
    { label: 'Zustand', description: 'Client-only UI state that does not belong on the server' },
    { label: 'Vaul', description: 'Mobile bottom sheets for overlays and the user menu' },
    { label: 'Sonner', description: 'Toast notifications for lightweight feedback' },
    { label: 'Iconify', description: 'Consistent icon set via Lucide collection' },
] as const;

export default function DemoA() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDarkMode = resolvedAppearance === 'dark';
    const toastCount = useDemoStore((state) => state.toastCount);
    const incrementToastCount = useDemoStore((state) => state.incrementToastCount);

    function showToast(): void {
        incrementToastCount();
        toast.success(`Toast #${toastCount + 1} from the Sonner pattern.`);
    }

    return (
        <div className="flex min-h-full items-center justify-center p-4 md:p-8">
            <div className="flex w-full max-w-2xl flex-col gap-8">
                <div className="flex flex-col gap-3 text-center">
                    <div className="flex items-center justify-center gap-3">
                        <Switch
                            checked={isDarkMode}
                            aria-label="Toggle light and dark mode"
                            onCheckedChange={(enabled) => updateAppearance(enabled ? 'dark' : 'light')}
                        />
                        <span className="text-muted-foreground text-sm">Light/Dark</span>
                    </div>
                    <div className="bg-muted text-foreground inline-flex items-center justify-center gap-2 self-center rounded-lg px-4 py-1.5 text-sm font-medium">
                        <IconifyIcon name="lucide:zap" className="size-3.5" />
                        Vite + Inertia + Tailwind + shadcn
                    </div>
                    <h1 className="font-display text-foreground text-4xl font-bold tracking-tight">Demo Page A</h1>
                    <p className="text-muted-foreground text-lg">This page is rendered by React via Inertia.js, served by Laravel.</p>
                </div>

                <Card className="surface-raised">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <IconifyIcon name="lucide:layers" className="size-5" />
                            Stack Overview
                        </CardTitle>
                        <CardDescription>The technology powering this page</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="flex flex-col gap-3">
                            {stackItems.map((item) => (
                                <li key={item.label} className="flex items-start gap-3">
                                    <span className="bg-muted mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-lg">
                                        <span className="bg-foreground size-2 rounded-lg" />
                                    </span>
                                    <span className="text-muted-foreground text-sm">
                                        <strong className="text-foreground">{item.label}</strong>
                                        {' — '}
                                        {item.description}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button variant="outline" size="lg" className="w-full" onClick={showToast}>
                            <IconifyIcon name="lucide:bell" className="size-[18px]" />
                            Show a snackbar
                            {toastCount > 0 ? <span className="text-muted-foreground ml-1">({toastCount})</span> : null}
                        </Button>
                        <AppActionButton href={demoB.url()}>
                            Go to Demo Page B
                            <IconifyIcon name="lucide:arrow-right" className="size-[18px]" />
                        </AppActionButton>
                    </CardFooter>
                </Card>

                <p className="text-muted-foreground text-center text-xs">
                    Navigation is handled client-side by Inertia.js — no full page reload
                </p>
            </div>
        </div>
    );
}
