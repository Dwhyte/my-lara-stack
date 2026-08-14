import { ref  } from 'vue'
import type {Ref} from 'vue';

const sharedState = new Map<string, Ref<unknown>>()

export function useSharedState<T>(key: string, initial: () => T): Ref<T> {
  const existing = sharedState.get(key)

  if (existing) {
    return existing as Ref<T>
  }

  const state = ref(initial()) as Ref<T>
  sharedState.set(key, state as Ref<unknown>)

  return state
}
