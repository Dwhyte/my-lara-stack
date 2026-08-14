import { useSharedState } from '@/composables/useSharedState'

export function useUserMenuSheet() {
  const open = useSharedState('user-menu-open', () => false)

  function openUserMenu(): void {
    open.value = true
  }

  function closeUserMenu(): void {
    open.value = false
  }

  return {
    open,
    openUserMenu,
    closeUserMenu,
  }
}
