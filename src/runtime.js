// @jannchie/icons/runtime：框架组件包（@jannchie/icons-vue、@jannchie/icons-react）共用的纯函数
// 不依赖渲染引擎和任何框架；不在顶层碰 window，服务端渲染时可以安全导入
export { rootAttrs } from './svg-root.js'

// size：数字或 '20'、'20px' 这样的纯像素值才能做像素对齐；'1em' 之类的 CSS 长度原样输出，不对齐（返回 0）
const PX = /^\s*(\d+(?:\.\d+)?)(?:px)?\s*$/
export function pixelSize(size) {
  if (typeof size === 'number')
    return size
  const m = typeof size === 'string' && PX.exec(size)
  return m ? Number(m[1]) : 0
}

// 默认配置的合并：内层覆盖外层，colors 按角色合并
export function mergeDefaults(outer, inner) {
  const out = { ...outer, ...inner }
  if (outer.colors || inner.colors)
    out.colors = { ...outer.colors, ...inner.colors }
  return out
}

// 设备像素比；服务端是 1
export const getDpr = () => (typeof window === 'undefined' ? 1 : window.devicePixelRatio || 1)

// 订阅设备像素比的变化（浏览器缩放、拖到另一块屏幕），返回取消订阅的函数
// 第一次订阅时才开始监听：主要靠 resolution 媒体查询的 change；有的环境不发这个事件，再用 resize 兜底
// （缩放一般也会触发 resize）。回调不带参数，用 getDpr() 读当前值；值没变时也可能被调用，由调用方比较
const listeners = new Set()
let watching = false
const notify = () => listeners.forEach(fn => fn())
function watch() {
  if (watching || typeof window === 'undefined')
    return
  watching = true
  const arm = () => window.matchMedia?.(`(resolution: ${getDpr()}dppx)`).addEventListener?.('change', () => {
    notify()
    arm()
  }, { once: true })
  arm()
  window.addEventListener('resize', notify, { passive: true })
}
export function subscribeDpr(cb) {
  listeners.add(cb)
  watch()
  return () => {
    listeners.delete(cb)
  }
}
