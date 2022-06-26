import type { App } from 'vue'

const { y } = useMouse()
let isdrag = $ref(false)
let startY = $ref(0)
let dragDom = $ref(null)
let tempDom = $ref(null)
let currentIndex = $ref(0)
let currentDomHeight = $ref(0)
export const myPlugin = {
  install(app: App<Element>) {
    app.directive('drag', {
      mounted(el: HTMLElement, binding) {
        el.dataset.index = binding.value
        el.style.zIndex = '2'
        const parentEl = el.parentNode
        const parentRectTop = getParentRect(el.parentNode as HTMLElement)
        el.addEventListener('mousedown', (e: MouseEvent) => {
          e.preventDefault()
          currentIndex = +el.dataset.index
          if ((e.target as HTMLElement).getAttribute('title') === 'remove')
            return zoneNames.value.filter(h, i => currentIndex !== i)
          if ((e.target as HTMLElement).getAttribute('title') === 'swap')
            return homeZone.value = zones.value[currentIndex].name
          dragDom = el
          isdrag = true
          startY = y.value
          const rect = $computed(() => el.getBoundingClientRect())
          const { height, top, width } = rect
          currentDomHeight = height
          el.style.position = 'absolute'
          el.style.top = `${top - parentRectTop}px`
          el.style.width = `${width}px`
          el.style.zIndex = '1'
          tempDom = createELement(height)
          el.parentNode.insertBefore(tempDom, el)
        })
        parentEl.addEventListener('mousemove', (e: MouseEvent) => {
          e.preventDefault()
          if (!isdrag || !dragDom)
            return false
          const distance = y.value - startY
          dragDom.style.top = `${distance + currentIndex * currentDomHeight}px`
        })
        el.addEventListener('mouseenter', (e: MouseEvent) => {
          e.preventDefault()
          if (!isdrag || !dragDom)
            return false
          if (el.dataset.index > dragDom.dataset.index)
            switchEle(parentEl as HTMLElement, tempDom, el)

          else if (el.dataset.index < dragDom.dataset.index)
            switchEle(parentEl as HTMLElement, el, tempDom)

          const swapTemp = el.dataset.index
          el.dataset.index = dragDom.dataset.index
          dragDom.dataset.index = swapTemp
        })
        el.addEventListener('mouseup', () => {
          css(dragDom)
          switchEle(parentEl as HTMLElement, tempDom, el)
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
  tempEl: HTMLElement,
  el: HTMLElement,
) {
  parentEl.insertBefore(el, tempEl)
}

function css(el: HTMLElement) {
  el.style.position = 'relative'
  el.style.top = '0'
  el.style.zIndex = '2'
}
