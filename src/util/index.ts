import type { Ref } from 'vue'

export function useOutside(ref: Ref<HTMLElement>, cb: Function) {
  const listener = (e: Event) => {
    if (e.target !== ref.value)
      cb()
  }
  onMounted(() => {
    document.addEventListener('click', listener)
  })

  onUnmounted(() => {
    document.removeEventListener('click', listener)
  })
}
