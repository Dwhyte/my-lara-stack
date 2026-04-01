import { Icon } from '@iconify/vue';
import { h } from 'vue';
import type { IconProps, IconSet } from 'vuetify';

/**
 * Custom Iconify icon set for Vuetify
 *
 * Usage: <v-icon>lucide:mail</v-icon>
 */
const iconify: IconSet = {
    component: (props: IconProps) => {
        const icon = typeof props.icon === 'string' ? props.icon : '';

        return h(Icon, { icon, ssr: false });
    },
};

export default iconify;
