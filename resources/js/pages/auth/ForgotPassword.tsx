import { Form, Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

type ForgotPasswordProps = {
    status?: string;
};

export default function ForgotPassword({ status }: ForgotPasswordProps) {
    return (
        <div className="mx-auto w-full max-w-[400px] px-6 py-10 md:px-0 md:py-16">
            <h1 className="font-display text-[2rem] leading-[2.625rem] font-extrabold tracking-tight text-[var(--auth-ink)]">
                Forgot password
            </h1>
            <p className="mt-2 text-sm text-[var(--auth-muted)]">Enter your email and we will send a reset link.</p>

            {status ? <p className="text-success mt-4 text-sm">{status}</p> : null}

            <Form action="/forgot-password" method="post" className="mt-8">
                {({ errors, processing }) => (
                    <FieldGroup>
                        <Field data-invalid={Boolean(errors.email)}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />
                            {errors.email ? <FieldError>{errors.email}</FieldError> : null}
                        </Field>
                        <Button type="submit" className="h-11 w-full rounded-xl" disabled={processing}>
                            Send reset link
                        </Button>
                    </FieldGroup>
                )}
            </Form>

            <p className="mt-8 text-center text-[15px] text-[var(--auth-muted)]">
                <Link href="/login" className="font-medium text-[var(--auth-link)] hover:underline">
                    Back to sign in
                </Link>
            </p>
        </div>
    );
}
