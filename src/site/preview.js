// 只有预览站用的东西：懒加载用的视口观察、CSS 像素换设备像素、预览配色
// 不进发布包（@jannchie/icons 只打 export.js、render.js 这些没有顶层副作用的模块），这里碰 DOM、全局对象都没关系
import { ROLES } from '../tone'

// CSS 像素 → 设备像素
export const devicePx = css => css * (globalThis.devicePixelRatio || 1)

// 预览：各角色用页面上的 CSS 变量（--icon-danger 等），切换颜色不用重算路径；单色模式下都是 currentColor
export const PREVIEW_COLORS = Object.fromEntries(Object.keys(ROLES).map(r => [r, `var(--icon-${r}, currentColor)`]))

// 所有格子共用一个 IntersectionObserver：进入、离开视口上下 600px 范围时都通知（一直观察，直到格子卸载）
// 第一次用到时才创建
const callbacks = new WeakMap()
let observer
function getObserver() {
  if (observer === undefined) {
    observer = typeof IntersectionObserver === 'undefined'
      ? null
      : new IntersectionObserver((entries) => {
        for (const e of entries)
          callbacks.get(e.target)?.(e.isIntersecting)
      }, { rootMargin: '600px 0px' })
  }
  return observer
}

export function observeVisibility(el, fn) {
  const o = getObserver()
  if (!o)
    return fn(true)
  callbacks.set(el, fn)
  o.observe(el)
}
export function forget(el) {
  observer?.unobserve(el)
  callbacks.delete(el)
}
