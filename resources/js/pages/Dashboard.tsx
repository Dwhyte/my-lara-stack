import { Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Dashboard() {
    return (
        <div className="flex min-h-full items-center justify-center p-4 md:p-8">
            <Card className="w-full max-w-lg">
                <CardHeader>
                    <CardTitle>Dashboard</CardTitle>
                    <CardDescription>You are signed in. Demo pages live next to this starter shell.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/demo/a">Go to Demo A</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
