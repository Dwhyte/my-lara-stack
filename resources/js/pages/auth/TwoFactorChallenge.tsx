import { Form } from '@inertiajs/react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

export default function TwoFactorChallenge() {
    const [recovery, setRecovery] = useState(false);

    return (
        <div className="mx-auto w-full max-w-[400px] px-6 py-10 md:px-0 md:py-16">
            <h1 className="font-display text-[2rem] leading-[2.625rem] font-extrabold tracking-tight text-[var(--auth-ink)]">
                Two-factor challenge
            </h1>
            <p className="mt-2 text-sm text-[var(--auth-muted)]">
                {recovery ? 'Enter a recovery code.' : 'Enter the code from your authenticator app.'}
            </p>

            <Form action="/two-factor-challenge" method="post" className="mt-8">
                {({ errors, processing }) => (
                    <FieldGroup>
                        {recovery ? (
                            <Field data-invalid={Boolean(errors.code)}>
                                <FieldLabel htmlFor="recovery_code">Recovery code</FieldLabel>
                                <Input id="recovery_code" name="recovery_code" autoComplete="one-time-code" />
                                {errors.code ? <FieldError>{errors.code}</FieldError> : null}
                            </Field>
                        ) : (
                            <Field data-invalid={Boolean(errors.code)}>
                                <FieldLabel htmlFor="code">Authentication code</FieldLabel>
                                <Input id="code" name="code" inputMode="numeric" autoComplete="one-time-code" />
                                {errors.code ? <FieldError>{errors.code}</FieldError> : null}
                            </Field>
                        )}
                        <Button type="submit" className="h-11 w-full rounded-xl" disabled={processing}>
                            Continue
                        </Button>
                    </FieldGroup>
                )}
            </Form>

            <button
                type="button"
                className="mt-4 text-sm text-[var(--auth-link)] hover:underline"
                onClick={() => setRecovery((current) => !current)}
            >
                {recovery ? 'Use an authentication code' : 'Use a recovery code'}
            </button>
        </div>
    );
}
