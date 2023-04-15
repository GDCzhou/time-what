import type { App } from 'vue'

const { y } = useMouse()
let isdrag = $ref(false)
let startY = $ref(0)
let dragDom = $ref(null)
let tempDom = $ref(null)
let tempIndex = $ref(0)
let dragDomIndex = $ref(0)
let currentDomHeight = $ref(0)
export const myPlugin = {
  install(app: App<Element>) {
    app.directive('drag', {
      mounted(el: HTMLElement) {
        // el.dataset.index = binding.value
        el.style.zIndex = '2'
        const parentEl = el.parentNode
        const parentRectTop = getParentRect(el.parentNode as HTMLElement)
        el.addEventListener('mousedown', (e: MouseEvent) => {
          e.preventDefault()
          dragDomIndex = Array.from(parentEl.children).findIndex(item => item === el)
          if ((e.target as HTMLElement).getAttribute('title') === 'remove') {
            remove(zones.value[dragDomIndex])
            return
          }
          if ((e.target as HTMLElement).getAttribute('title') === 'swap')
            return switchTimeZone(zones.value[dragDomIndex])

          dragDom = el
          isdrag = true
          startY = y.value
          const rect = $computed(() => el.getBoundingClientRect())
          const { height, top } = rect
          currentDomHeight = height
          el.style.position = 'absolute'
          el.style.top = `${top - parentRectTop}px`
          el.style.width = '100%'
          el.style.zIndex = '1'
          tempDom = createELement(height)
          el.parentNode.insertBefore(tempDom, el)
          tempIndex = dragDomIndex
        })

        parentEl.addEventListener('mousemove', (e: MouseEvent) => {
          e.preventDefault()
          if (!isdrag || !dragDom)
            return false
          const distance = y.value - startY
          const startDistance = dragDomIndex * currentDomHeight
          dragDom.style.top = `${distance + startDistance}px`
        })

        el.addEventListener('mouseover', (e: MouseEvent) => {
          e.preventDefault()
          e.stopPropagation()
          if (!isdrag || !dragDom)
            return false
          const currentDomIndex = Array.from(parentEl.children).findIndex(item => item === el)
          if (currentDomIndex > (tempIndex))
            switchEle(parentEl as HTMLElement, tempDom, el)

          else if (currentDomIndex < (tempIndex))
            switchEle(parentEl as HTMLElement, el, tempDom)
          tempIndex = currentDomIndex
        })

        document.addEventListener('mouseup', (e: MouseEvent) => {
          e.preventDefault()
          if (!dragDom)
            return
          e.preventDefault()
          css(dragDom)
          switchEle(parentEl as HTMLElement, tempDom, dragDom)
          parentEl.removeChild(tempDom)
          isdrag = false
          dragDom = null
        })
      },
    })
  },
}

function getParentRect(el: HTMLElement) {
  return el.getBoundingClientRect().top
}

function createELement(height: number) {
  const el = document.createElement('div')
  el.style.height = `${height}px`
  el.style.width = '100%'
  el.style.background = '#ccc'
  el.classList.add('dragel')
  return el
}

function switchEle(
  parentEl: HTMLElement,
  el1: HTMLElement,
  el2: HTMLElement,
) {
  parentEl.insertBefore(el2, el1)
}

function css(el: HTMLElement) {
  el.style.position = 'relative'
  el.style.top = '0'
  el.style.zIndex = '2'
}
