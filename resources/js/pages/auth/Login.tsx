import { Form, Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

type LoginProps = {
    canResetPassword?: boolean;
    canRegister?: boolean;
    status?: string;
};

export default function Login({ canResetPassword, canRegister, status }: LoginProps) {
    return (
        <div className="mx-auto w-full max-w-[400px] px-6 py-10 md:px-0 md:py-16">
            <h1 className="font-display text-[2rem] leading-[2.625rem] font-extrabold tracking-tight text-[var(--auth-ink)]">
                Sign in
            </h1>

            {status ? <p className="text-success mt-4 text-sm">{status}</p> : null}

            <Form action="/login" method="post" className="mt-8">
                {({ errors, processing }) => (
                    <FieldGroup>
                        <Field data-invalid={Boolean(errors.email)}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input id="email" name="email" type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} />
                            {errors.email ? <FieldError>{errors.email}</FieldError> : null}
                        </Field>
                        <Field data-invalid={Boolean(errors.password)}>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                aria-invalid={Boolean(errors.password)}
                            />
                            {errors.password ? <FieldError>{errors.password}</FieldError> : null}
                        </Field>
                        <Button type="submit" className="h-11 w-full rounded-xl" disabled={processing}>
                            Sign in
                        </Button>
                    </FieldGroup>
                )}
            </Form>

            {canResetPassword ? (
                <p className="mt-4 text-center text-sm text-[var(--auth-muted)]">
                    <Link href="/forgot-password" className="text-[var(--auth-link)] hover:underline">
                        Forgot password?
                    </Link>
                </p>
            ) : null}

            {canRegister ? (
                <p className="mt-8 text-center text-[15px] text-[var(--auth-muted)]">
                    No account?{' '}
                    <Link href="/register" className="font-medium text-[var(--auth-link)] hover:underline">
                        Sign up
                    </Link>
                </p>
            ) : null}
        </div>
    );
}
