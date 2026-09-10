import { Form, Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';

type VerifyEmailProps = {
    status?: string;
};

export default function VerifyEmail({ status }: VerifyEmailProps) {
    return (
        <div className="mx-auto w-full max-w-[400px] px-6 py-10 md:px-0 md:py-16">
            <h1 className="font-display text-[2rem] leading-[2.625rem] font-extrabold tracking-tight text-[var(--auth-ink)]">
                Verify email
            </h1>
            <p className="mt-2 text-sm text-[var(--auth-muted)]">
                Check your inbox for a verification link before continuing.
            </p>

            {status ? <p className="text-success mt-4 text-sm">{status}</p> : null}

            <Form action="/email/verification-notification" method="post" className="mt-8">
                {({ processing }) => (
                    <Button type="submit" className="h-11 w-full rounded-xl" disabled={processing}>
                        Resend verification email
                    </Button>
                )}
            </Form>

            <p className="mt-8 text-center text-[15px] text-[var(--auth-muted)]">
                <Link href="/logout" method="post" className="font-medium text-[var(--auth-link)] hover:underline">
                    Log out
                </Link>
            </p>
        </div>
    );
}
