import { Form } from '@inertiajs/react';

import AppActionButton from '@/components/AppActionButton';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';

type SecurityProps = {
    canManageTwoFactor?: boolean;
    twoFactorEnabled?: boolean;
    requiresConfirmation?: boolean;
};

export default function Security({ canManageTwoFactor, twoFactorEnabled }: SecurityProps) {
    return (
        <div className="app-page-shell max-w-lg">
            <h1 className="app-page-title">Security</h1>
            <p className="app-page-lead">Update your password and two-factor settings.</p>

            <Card className="mt-6">
                <CardContent className="pt-6">
                    <Form action="/settings/password" method="put">
                        {({ errors, processing }) => (
                            <FieldGroup>
                                <Field data-invalid={Boolean(errors.current_password)}>
                                    <FieldLabel htmlFor="current_password">Current password</FieldLabel>
                                    <Input
                                        id="current_password"
                                        name="current_password"
                                        type="password"
                                        autoComplete="current-password"
                                        aria-invalid={Boolean(errors.current_password)}
                                    />
                                    {errors.current_password ? <FieldError>{errors.current_password}</FieldError> : null}
                                </Field>
                                <Field data-invalid={Boolean(errors.password)}>
                                    <FieldLabel htmlFor="password">New password</FieldLabel>
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
                                <AppActionButton type="submit" loading={processing}>
                                    Update password
                                </AppActionButton>
                            </FieldGroup>
                        )}
                    </Form>
                </CardContent>
            </Card>

            {canManageTwoFactor ? (
                <Card className="mt-6">
                    <CardContent className="pt-6">
                        <h2 className="text-foreground text-sm font-semibold">Two-factor authentication</h2>
                        <p className="text-muted-foreground mt-1 text-sm">
                            {twoFactorEnabled ? 'Two-factor authentication is enabled.' : 'Two-factor authentication is off.'}
                        </p>
                    </CardContent>
                </Card>
            ) : null}
        </div>
    );
}
