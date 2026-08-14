import { Icon } from '@iconify/vue'
import { h } from 'vue'
import type { IconProps, IconSet } from 'vuetify'

const iconify: IconSet = {
  component: (props: IconProps) => {
    const icon = typeof props.icon === 'string' ? props.icon : ''

    return h(Icon, { icon, ssr: false })
  }
}

export default iconify
