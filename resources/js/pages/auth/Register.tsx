import { Form, Link } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export default function Register() {
    return (
        <div className="mx-auto w-full max-w-[400px] px-6 py-10 md:px-0 md:py-16">
            <h1 className="font-display text-[2rem] leading-[2.625rem] font-extrabold tracking-tight text-[var(--auth-ink)]">
                Sign up
            </h1>

            <Form action="/register" method="post" className="mt-8">
                {({ errors, processing }) => (
                    <FieldGroup>
                        <Field data-invalid={Boolean(errors.name)}>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input id="name" name="name" autoComplete="name" aria-invalid={Boolean(errors.name)} />
                            {errors.name ? <FieldError>{errors.name}</FieldError> : null}
                        </Field>
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
                                autoComplete="new-password"
                                aria-invalid={Boolean(errors.password)}
                            />
                            {errors.password ? <FieldError>{errors.password}</FieldError> : null}
                        </Field>
                        <Field data-invalid={Boolean(errors.password_confirmation)}>
                            <FieldLabel htmlFor="password_confirmation">Confirm password</FieldLabel>
                            <Input
                                id="password_confirmation"
                                name="password_confirmation"
                                type="password"
                                autoComplete="new-password"
                                aria-invalid={Boolean(errors.password_confirmation)}
                            />
                            {errors.password_confirmation ? <FieldError>{errors.password_confirmation}</FieldError> : null}
                        </Field>
                        <Button type="submit" className="h-11 w-full rounded-xl" disabled={processing}>
                            Create account
                        </Button>
                    </FieldGroup>
                )}
            </Form>

            <p className="mt-8 text-center text-[15px] text-[var(--auth-muted)]">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-[var(--auth-link)] hover:underline">
                    Sign in
                </Link>
            </p>
        </div>
    );
}
