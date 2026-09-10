import { Form, usePage } from '@inertiajs/react';

import AppActionButton from '@/components/AppActionButton';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import type { AppSharedProps } from '@/types/inertia';

type ProfileProps = {
    mustVerifyEmail?: boolean;
    status?: string;
};

export default function Profile({ mustVerifyEmail, status }: ProfileProps) {
    const { props } = usePage<AppSharedProps>();
    const user = props.auth.user;

    return (
        <div className="app-page-shell max-w-lg">
            <h1 className="app-page-title">Profile</h1>
            <p className="app-page-lead">Update your name and email address.</p>

            {status ? <p className="text-success mt-4 text-sm">{status}</p> : null}

            <Card className="mt-6">
                <CardContent className="pt-6">
                    <Form action="/settings/profile" method="patch">
                        {({ errors, processing }) => (
                            <FieldGroup>
                                <Field data-invalid={Boolean(errors.name)}>
                                    <FieldLabel htmlFor="name">Name</FieldLabel>
                                    <Input id="name" name="name" defaultValue={user?.name ?? ''} aria-invalid={Boolean(errors.name)} />
                                    {errors.name ? <FieldError>{errors.name}</FieldError> : null}
                                </Field>
                                <Field data-invalid={Boolean(errors.email)}>
                                    <FieldLabel htmlFor="email">Email</FieldLabel>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        defaultValue={user?.email ?? ''}
                                        aria-invalid={Boolean(errors.email)}
                                    />
                                    {errors.email ? <FieldError>{errors.email}</FieldError> : null}
                                </Field>
                                {mustVerifyEmail && user && !user.email_verified_at ? (
                                    <p className="text-muted-foreground text-sm">Your email address is unverified.</p>
                                ) : null}
                                <AppActionButton type="submit" loading={processing}>
                                    Save
                                </AppActionButton>
                            </FieldGroup>
                        )}
                    </Form>
                </CardContent>
            </Card>

            <Card className="mt-6">
                <CardContent className="pt-6">
                    <h2 className="text-foreground text-sm font-semibold">Delete account</h2>
                    <p className="text-muted-foreground mt-1 text-sm">This will permanently delete your account.</p>
                    <Form action="/settings/profile" method="delete" className="mt-4">
                        {({ errors, processing }) => (
                            <FieldGroup>
                                <Field data-invalid={Boolean(errors.password)}>
                                    <FieldLabel htmlFor="delete-password">Password</FieldLabel>
                                    <Input
                                        id="delete-password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        aria-invalid={Boolean(errors.password)}
                                    />
                                    {errors.password ? <FieldError>{errors.password}</FieldError> : null}
                                </Field>
                                <AppActionButton type="submit" loading={processing} className="bg-destructive shadow-none hover:bg-destructive/90">
                                    Delete account
                                </AppActionButton>
                            </FieldGroup>
                        )}
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
