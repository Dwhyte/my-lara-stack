import { router, usePage } from '@inertiajs/vue3'
import { computed, reactive } from 'vue'

function pathnameFromPageUrl(url: string): string {
  return new URL(url, 'http://local').pathname
}

function queryFromPageUrl(url: string): Record<string, string | string[]> {
  const params = new URL(url, 'http://local').searchParams
  const query: Record<string, string | string[]> = {}

  for (const key of params.keys()) {
    const values = params.getAll(key)

    query[key] = values.length > 1 ? values : values[0] ?? ''
  }

  return query
}

export function navigateTo(path: string, options?: { replace?: boolean }): void {
  router.visit(path, { replace: options?.replace ?? false })
}

export function useRoute() {
  const page = usePage()

  const path = computed(() => pathnameFromPageUrl(page.url))
  const query = computed(() => queryFromPageUrl(page.url))
  const params = computed(() => page.props as Record<string, unknown>)

  return reactive({
    get path() {
      return path.value
    },
    get query() {
      return query.value
    },
    get params() {
      return params.value
    },
  })
}

export function useRouter() {
  return router
}
