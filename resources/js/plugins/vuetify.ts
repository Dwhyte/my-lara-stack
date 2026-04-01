import '@mdi/font/css/materialdesignicons.css';
// @ts-expect-error Vite plugin resolves Vuetify styles
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { darkThemeColors, lightThemeColors } from '@/theme/tokens';
import iconify from './vuetify-icons';

export default createVuetify({
    icons: {
        defaultSet: 'iconify',
        sets: {
            iconify,
        },
    },
    theme: {
        defaultTheme: 'light',
        utilities: true,
        themes: {
            light: {
                colors: {
                    ...lightThemeColors,
                },
            },
            dark: {
                colors: {
                    ...darkThemeColors,
                },
            },
        },
    },
    display: {
        mobileBreakpoint: 'md',
        thresholds: {
            xs: 0,
            sm: 600,
            md: 840,
            lg: 1145,
            xl: 1545,
            xxl: 2138,
        },
    },
});
