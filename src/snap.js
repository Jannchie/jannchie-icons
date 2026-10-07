// 像素对齐的前提：图标框的左上角落在整数设备像素上。flex 居中、文字基线、1fr 列宽常把图标摆在 x.797 这种位置，
// 这时按网格算好的对齐整体错开，反而更虚。这里量出图标的实际位置，用不到 1 像素的 CSS 平移把它挪到整数像素上
// 读写分开批量做（同一轮微任务里先全部读位置、再全部写平移；不用 rAF，后台标签页里它不触发），上千个图标也只触发一次布局；容器尺寸变了、窗口缩放了都重新量
const offsets = new WeakMap()
const pending = new Set()
const watched = new Set()
let queued = false

function flush() {
  queued = false
  const dpr = globalThis.devicePixelRatio || 1
  const jobs = [...pending].filter(el => el.isConnected).map((el) => {
    const r = el.getBoundingClientRect()
    const [ox, oy] = offsets.get(el) ?? [0, 0]
    const x = (r.left - ox) * dpr
    const y = (r.top - oy) * dpr
    // 正好差半像素时往左、往上取整：这种情况多是在奇数高度的容器里居中（比如带 1px 底边的页头），
    // 和旁边的文字、按钮一样落在偏上半像素的位置，不往下进位
    const near = v => Math.ceil(v - 0.5)
    return [el, (near(x) - x) / dpr, (near(y) - y) / dpr]
  })
  pending.clear()
  for (const [el, dx, dy] of jobs) {
    offsets.set(el, [dx, dy])
    el.style.transform = Math.abs(dx) > 1e-3 || Math.abs(dy) > 1e-3 ? `translate(${dx.toFixed(3)}px, ${dy.toFixed(3)}px)` : ''
  }
}
function schedule(el) {
  pending.add(el)
  if (!queued) {
    queued = true
    queueMicrotask(flush)
  }
}

// 容器尺寸变化（列宽、详情栏开合）会挪动图标：观察每个图标的父元素
const parents = new Map()
const parentOf = new WeakMap()
const observer = typeof ResizeObserver === 'undefined'
  ? null
  : new ResizeObserver(entries => entries.forEach(e => parents.get(e.target)?.forEach(schedule)))
if (typeof window !== 'undefined')
  window.addEventListener('resize', () => watched.forEach(schedule))

export function snapToPixels(el) {
  if (!watched.has(el)) {
    watched.add(el)
    const parent = el.parentElement
    if (parent && observer) {
      if (!parents.has(parent)) {
        parents.set(parent, new Set())
        observer.observe(parent)
      }
      parents.get(parent).add(el)
      parentOf.set(el, parent)
    }
  }
  schedule(el)
}

export function unsnap(el) {
  watched.delete(el)
  pending.delete(el)
  offsets.delete(el)
  el.style.transform = ''
  const parent = parentOf.get(el)
  const set = parent && parents.get(parent)
  if (set?.delete(el) && !set.size) {
    parents.delete(parent)
    observer?.unobserve(parent)
  }
}

// 布局整体变化（内容区宽度、列数）时全部重新量：图标自己的父元素尺寸不一定变，但位置变了
export const resnapAll = () => watched.forEach(schedule)
