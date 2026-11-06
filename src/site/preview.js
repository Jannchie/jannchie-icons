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

// 分帧计算：实心变体的路径要现算（fill.js，每个几毫秒），一屏几百个图标一起算会卡住页面好几秒。
// 排进队列，每帧最多算 FRAME_BUDGET 毫秒，其余留到下一帧；返回取消函数（格子离开视口、设置又变了时用）
const FRAME_BUDGET = 8
const queue = new Set()
let pending = false
function drain() {
  pending = false
  const end = performance.now() + FRAME_BUDGET
  for (const job of queue) {
    queue.delete(job)
    job()
    if (performance.now() > end)
      break
  }
  if (queue.size)
    wake()
}
function wake() {
  if (!pending) {
    pending = true
    requestAnimationFrame(drain)
  }
}
export function schedule(job) {
  queue.add(job)
  wake()
  return () => queue.delete(job)
}
