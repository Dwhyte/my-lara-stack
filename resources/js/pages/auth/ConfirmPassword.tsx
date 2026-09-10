import { Form } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export default function ConfirmPassword() {
    return (
        <div className="mx-auto w-full max-w-[400px] px-6 py-10 md:px-0 md:py-16">
            <h1 className="font-display text-[2rem] leading-[2.625rem] font-extrabold tracking-tight text-[var(--auth-ink)]">
                Confirm password
            </h1>
            <p className="mt-2 text-sm text-[var(--auth-muted)]">This is a secure area. Confirm your password to continue.</p>

            <Form action="/user/confirm-password" method="post" className="mt-8">
                {({ errors, processing }) => (
                    <FieldGroup>
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
                            Confirm
                        </Button>
                    </FieldGroup>
                )}
            </Form>
        </div>
    );
}
