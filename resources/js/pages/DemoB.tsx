import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, CircleCheck, Server } from 'lucide-react';

import { demoA } from '@/actions/App/Http/Controllers/DemoController';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/AppLayout';
import type { AppSharedProps } from '@/types/inertia';

type DemoBProps = AppSharedProps & {
    message?: string;
    timestamp?: string;
};

export default function DemoB({ message, timestamp }: DemoBProps) {
    return (
        <>
            <Head title="Demo B" />

            <div className="flex min-h-screen items-center justify-center bg-background p-8">
                <div className="w-full max-w-2xl space-y-8">
                    <div className="space-y-3 text-center">
                        <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-700 dark:text-emerald-400">
                            <CircleCheck className="size-3.5" />
                            Navigation successful
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-foreground">Demo Page B</h1>
                        <p className="text-lg text-muted-foreground">
                            You navigated here from Demo A via Inertia.js client-side routing.
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Server className="size-5" />
                                Server-Provided Props
                            </CardTitle>
                            <CardDescription>
                                Data passed from the Laravel controller to this React component
                            </CardDescription>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <div className="space-y-2 rounded-lg bg-muted p-4 font-mono text-sm">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-muted-foreground">message:</span>
                                    <span className="text-foreground">
                                        &quot;{message ?? 'Hello from Laravel!'}&quot;
                                    </span>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-muted-foreground">timestamp:</span>
                                    <span className="text-muted-foreground">{timestamp ?? '—'}</span>
                                </div>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                These values were assigned as props by the Laravel controller using{' '}
                                <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                                    Inertia::render()
                                </code>
                                .
                            </p>
                        </CardContent>

                        <CardFooter>
                            <Button asChild className="group w-full" size="lg" variant="outline">
                                <Link href={demoA.url()}>
                                    <ArrowLeft className="mr-1 size-4 transition-transform group-hover:-translate-x-1" />
                                    Back to Demo Page A
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <p className="text-center text-xs text-muted-foreground">
                        Navigate back — Inertia preserves scroll position and handles history
                    </p>
                </div>
            </div>
        </>
    );
}

DemoB.layout = (page: React.ReactNode) => <AppLayout>{page}</AppLayout>;
