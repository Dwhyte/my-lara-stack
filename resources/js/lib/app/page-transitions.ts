export const instantTransitionPaths = ['/', '/loading'] as const;

export type InstantTransitionPath = (typeof instantTransitionPaths)[number];

export type PageTransitionName = 'page';

export function isInstantTransitionPath(path: string): path is InstantTransitionPath {
    return (instantTransitionPaths as readonly string[]).includes(path);
}

export function resolvePageTransitionName(fromPath: string, toPath: string): PageTransitionName | null {
    if (fromPath === toPath) {
        return null;
    }

    if (isInstantTransitionPath(fromPath) || isInstantTransitionPath(toPath)) {
        return null;
    }

    return 'page';
}
