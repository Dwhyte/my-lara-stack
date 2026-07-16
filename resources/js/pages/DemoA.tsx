import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Bell, Layers, Zap } from 'lucide-react';
import { toast } from 'sonner';

import { demoB } from '@/actions/App/Http/Controllers/DemoController';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { useAppearance } from '@/hooks/use-appearance';
import AppLayout from '@/layouts/AppLayout';
import { useDemoToast } from '@/stores/use-demo-store';

const stackItems = [
    {
        label: 'Laravel',
        description: 'Handles routing, validation, and serves the initial HTML',
    },
    {
        label: 'Inertia.js',
        description: 'Bridges Laravel controllers with React page components',
    },
    {
        label: 'React',
        description: 'Renders interactive UI on the client',
    },
    {
        label: 'Vite',
        description: 'Bundles and serves assets with HMR in development',
    },
    {
        label: 'Tailwind CSS',
        description: 'Utility-first layout and styling',
    },
    {
        label: 'shadcn/ui',
        description: 'Accessible, composable UI components built on Radix',
    },
    {
        label: 'Lucide',
        description: 'Consistent icon set for React components',
    },
    {
        label: 'Zustand',
        description: 'Client-only UI state that does not belong on the server',
    },
] as const;

export default function DemoA() {
    const { resolvedAppearance, updateAppearance } = useAppearance();
    const isDarkMode = resolvedAppearance === 'dark';
    const { toastCount, incrementToastCount } = useDemoToast();

    const showToast = () => {
        incrementToastCount();
        toast.success('Toast fired from Sonner', {
            description: `This is toast #${toastCount + 1}, counted in a Zustand store.`,
        });
    };

    return (
        <>
            <Head title="Demo A" />

            <div className="flex min-h-screen items-center justify-center bg-background p-8">
                <div className="w-full max-w-2xl space-y-8">
                    <div className="space-y-3 text-center">
                        <div className="flex items-center justify-center gap-3">
                            <Switch
                                checked={isDarkMode}
                                onCheckedChange={(enabled) => {
                                    updateAppearance(enabled ? 'dark' : 'light');
                                }}
                                aria-label="Toggle light and dark mode"
                            />
                            <span className="text-sm text-muted-foreground">Light/Dark</span>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-lg bg-muted px-4 py-1.5 text-sm font-medium text-foreground">
                            <Zap className="size-3.5" />
                            Vite + Inertia + Tailwind + shadcn/ui
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground">Demo Page A</h1>
                        <p className="text-lg text-muted-foreground">
                            This page is rendered by React via Inertia.js, served by Laravel.
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Layers className="size-5" />
                                Stack Overview
                            </CardTitle>
                            <CardDescription>The technology powering this page</CardDescription>
                        </CardHeader>

                        <CardContent>
                            <ul className="space-y-3">
                                {stackItems.map((item) => (
                                    <li key={item.label} className="flex items-start gap-3">
                                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-lg bg-muted">
                                            <span className="size-2 rounded-lg bg-foreground" />
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            <strong className="text-foreground">{item.label}</strong>
                                            {' — '}
                                            {item.description}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>

                        <CardFooter className="flex-col gap-2">
                            <Button
                                type="button"
                                className="w-full"
                                size="lg"
                                variant="outline"
                                onClick={showToast}
                            >
                                <Bell className="mr-1 size-4" />
                                Show a toast
                                {toastCount > 0 && (
                                    <span className="ml-1 text-muted-foreground">({toastCount})</span>
                                )}
                            </Button>
                            <Button asChild className="group w-full" size="lg" variant="secondary">
                                <Link href={demoB.url()}>
                                    Go to Demo Page B
                                    <ArrowRight className="ml-1 size-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <p className="text-center text-xs text-muted-foreground">
                        Navigation is handled client-side by Inertia.js — no full page reload
                    </p>
                </div>
            </div>
        </>
    );
}

DemoA.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
