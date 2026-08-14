export function validateLoginEmail(value: string): true | string {
    const trimmed = value.trim();

    if (trimmed === '') {
        return 'Email is required.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        return 'Enter a valid email address.';
    }

    return true;
}
