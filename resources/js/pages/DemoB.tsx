import { Link } from '@inertiajs/react';
import { demoA } from '@/actions/App/Http/Controllers/DemoController';
import IconifyIcon from '@/components/IconifyIcon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type DemoBProps = {
    message?: string;
    timestamp?: string;
};

export default function DemoB({ message, timestamp }: DemoBProps) {
    return (
        <div className="flex min-h-full items-center justify-center p-4 md:p-8">
            <div className="flex w-full max-w-2xl flex-col gap-8">
                <div className="flex flex-col gap-3 text-center">
                    <div className="bg-primary/10 text-primary inline-flex items-center justify-center gap-2 self-center rounded-lg px-4 py-1.5 text-sm font-medium">
                        <IconifyIcon name="lucide:circle-check" className="size-3.5" />
                        Navigation successful
                    </div>
                    <h1 className="font-display text-foreground text-4xl font-bold tracking-tight">Demo Page B</h1>
                    <p className="text-muted-foreground text-lg">
                        You navigated here from Demo A via Inertia.js client-side routing.
                    </p>
                </div>

                <Card className="surface-raised">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <IconifyIcon name="lucide:server" className="size-5" />
                            Server-Provided Props
                        </CardTitle>
                        <CardDescription>Data passed from the Laravel controller to this React component</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="bg-muted flex flex-col gap-2 rounded-lg p-4 font-mono text-sm">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-muted-foreground">message:</span>
                                <span className="text-foreground">"{message ?? 'Hello from Laravel!'}"</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="text-muted-foreground">timestamp:</span>
                                <span className="text-muted-foreground">{timestamp ?? '—'}</span>
                            </div>
                        </div>
                        <p className="text-muted-foreground text-sm">
                            These values were assigned as props by the Laravel controller using{' '}
                            <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">Inertia::render()</code>.
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button asChild variant="outline" size="lg" className="w-full">
                            <Link href={demoA.url()}>
                                <IconifyIcon name="lucide:arrow-left" className="size-[18px]" />
                                Back to Demo Page A
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>

                <p className="text-muted-foreground text-center text-xs">
                    Navigate back — Inertia preserves scroll position and handles history
                </p>
            </div>
        </div>
    );
}
