// 两个入口（. 和 ./static）共用：全局默认配置的注入键、设备像素比、尺寸解析
// 不在顶层碰 window：服务端渲染时整个模块都能安全导入
import { computed, inject, provide, shallowRef, toValue } from 'vue'

export const ICON_DEFAULTS = Symbol('jannchie-icons-defaults')

const EMPTY = Object.freeze({})
// 读当前组件树上的默认配置（没有就是空对象）
export const useIconDefaults = () => inject(ICON_DEFAULTS, null)

// 在组件里提供默认配置：子树里的 JIcon 都用它；嵌套时和外层的合并，colors 按角色合并
// defaults 可以是普通对象、ref、reactive 或 getter
export function provideIconDefaults(defaults) {
  const parent = inject(ICON_DEFAULTS, null)
  const merged = computed(() => mergeDefaults(parent?.value ?? EMPTY, toValue(defaults) ?? EMPTY))
  provide(ICON_DEFAULTS, merged)
  return merged
}

export function mergeDefaults(outer, inner) {
  const out = { ...outer, ...inner }
  if (outer.colors || inner.colors)
    out.colors = { ...outer.colors, ...inner.colors }
  return out
}

// 插件：app.use(JIconPlugin, { radius: 'sharp', weight: 'bold' })；整个应用的默认配置
export const JIconPlugin = {
  install(app, defaults = {}) {
    app.provide(ICON_DEFAULTS, computed(() => mergeDefaults(EMPTY, toValue(defaults) ?? EMPTY)))
  },
}

// 设备像素比：服务端和第一次渲染都按 1 算（和服务端输出一致，水合时不会对不上），
// 第一个图标挂载后才读 window.devicePixelRatio，并监听变化（浏览器缩放、拖到另一块屏幕）：
// 主要靠 resolution 媒体查询的 change；有的环境不发这个事件，再用 resize 兜底（缩放一般也会触发 resize），值没变时不会触发重绘
export const dpr = shallowRef(1)
let watching = false
export function watchDpr() {
  if (watching || typeof window === 'undefined')
    return
  watching = true
  const read = () => {
    dpr.value = window.devicePixelRatio || 1
  }
  const arm = () => {
    read()
    if (typeof window.matchMedia === 'function')
      window.matchMedia(`(resolution: ${dpr.value}dppx)`).addEventListener?.('change', arm, { once: true })
  }
  arm()
  window.addEventListener('resize', read, { passive: true })
}

// size：数字或 '20'、'20px' 这样的纯像素值才能做像素对齐；'1em' 之类的 CSS 长度原样输出，不对齐
const PX = /^\s*(\d+(?:\.\d+)?)(?:px)?\s*$/
export function pixelSize(size) {
  if (typeof size === 'number')
    return size
  const m = typeof size === 'string' && PX.exec(size)
  return m ? Number(m[1]) : 0
}
