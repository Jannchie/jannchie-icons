// 图标路径的懒计算 + 缓存：finalize（裁切、合并）开销不小，上千个图标不能一打开页面就全算
// 按「图标名 + 圆角 + 字重 + 对齐用的显示像素数」缓存，切回之前的设置不用重算
import { axisLines, finalize, minify } from './svg'
import { ROLES } from './tone'
import { affine, mapPath } from './transform'

// 像素对齐：按图标实际显示的设备像素数 px，把图标整体对齐到像素网格。图形本身不变形，只做两件事：
// - 线宽取整到整数个设备像素（至少 1）：1 倍屏 32px 下线宽 1 是 1.33 像素，抗锯齿后又淡又虚，取整成 1 像素就是实线；
//   缩小的符号（detail，比如文件角标里的小字母）线宽本来就封了顶，不取整
// - 整体平移不到半个像素：奇数像素宽的线中心要落在像素中心、偶数宽的落在像素边界，横竖线的两条边才正好是像素边界。
//   x、y 各挑一个平移量，让（按长度加权）落到网格上的横竖线最多。不逐点吸附——逐点取整会把一两个像素大的小字挤成一团
// 每个网格单位有 HINT_MAX_SCALE 个设备像素以上时虚边已经不明显，不处理；只用于屏幕显示，导出的 SVG 不做（不知道会用在多大）
const HINT_MAX_SCALE = 3
// 图标里的横竖线段：[轴向, 坐标, 长度, 线宽]
const axisLinesOf = (paths, widthOf) => paths.flatMap(p => axisLines(p.d).map(l => [...l, widthOf(p)]))
// 在 [-0.5, 0.5) 设备像素里挑平移量：候选是让某一条线正好对齐的平移，得分是所有线到网格的距离（按长度加权）之和
function bestShift(lines, k) {
  if (!lines.length)
    return 0
  const off = ([, v, , n]) => v * k - (n % 2 ? 0.5 : 0) // 离网格的偏差，取小数部分
  const frac = v => v - Math.round(v)
  const cost = dx => lines.reduce((s, l) => s + l[2] * Math.abs(frac(off(l) + dx)), 0)
  let best = [0, cost(0)]
  for (const l of lines) {
    const dx = -frac(off(l))
    const c = cost(dx)
    if (c < best[1] - 1e-9 || (Math.abs(c - best[1]) < 1e-9 && Math.abs(dx) < Math.abs(best[0])))
      best = [dx, c]
  }
  return best[0]
}
function hint(paths, stroke, px) {
  const k = px / 24
  // 取整后的线宽（设备像素）；点向下取整、但不小于主线宽——四舍五入常常让点比线大一整个像素，显得特别粗
  const line = Math.max(1, Math.round(stroke * k))
  const pxWidth = p => p.detail
    ? (p.width ?? stroke) * k
    : p.dot ? Math.max(line, Math.floor(p.width * k)) : Math.max(1, Math.round((p.width ?? stroke) * k))
  const lines = axisLinesOf(paths.filter(p => !p.detail && !p.fill), pxWidth)
  const dx = bestShift(lines.filter(l => l[0] === 'x'), k) / k
  const dy = bestShift(lines.filter(l => l[0] === 'y'), k) / k
  return paths.map((p) => {
    const d = dx || dy ? minify(affine(p.d, 1, 1, dx, dy)) : p.d
    // 点单独吸到像素中心（偶数像素宽的点吸到像素边界）：1 像素的点落在两个像素交界上会被摊成四个很淡的灰点，小尺寸下几乎看不见。
    // 点很小，挪不到半个像素看不出位移
    if (p.dot) {
      const o = pxWidth(p) % 2 ? 0.5 : 0
      const f = v => (Math.round(v * k - o) + o) / k
      return { ...p, d: minify(mapPath(d, ([x, y]) => [f(x), f(y)])), width: pxWidth(p) / k }
    }
    return { ...p, d, width: p.detail ? p.width : pxWidth(p) / k }
  })
}

// 动画图标：icon 文件导出 animation = { duration（毫秒）, frames（每周期采样帧数）, draw({ t, radius, stroke, weight }) }，
// t 是周期内的进度 0–1。逐帧 finalize，同一路径各帧的命令序列一致时，挂上 frames（d 的关键帧，首尾相接）和 dur，
// 由 SVG 自带的 <animate attributeName="d"> 播放——预览和导出的 SVG 都不依赖脚本和 CSS。结构对不上的路径退回静态
function animatedPaths(icon, opts, stroke) {
  const { duration, frames: n, draw } = icon.animation
  const frames = Array.from({ length: n }, (_, i) => finalize(draw({ ...opts, t: i / n }), stroke, { animated: true }))
  // 命令序列：数字换成占位符（数字可能紧挨着写，按 parse 同一套规则切分）
  const shape = d => d.replace(/-?(?:\d+\.?\d*|\.\d+)(?:e-?\d+)?/g, '#').replace(/\s/g, '')
  return frames[0].map((p, j) => {
    const ds = frames.map(f => f[j]?.d)
    const same = ds.every(d => d && shape(d) === shape(p.d))
    // 每帧都一样的路径（轨道、横杆）不挂动画，导出时省掉整串关键帧
    const still = ds.every(d => d === p.d)
    return same && !still ? { ...p, frames: [...ds, ds[0]], dur: duration } : p
  })
}
// <animate> 的属性；没有动画时为 null
export const animateAttrs = p => p.frames
  ? { attributeName: 'd', dur: `${p.dur}ms`, repeatCount: 'indefinite', values: p.frames.join(';') }
  : null

// CSS 像素 → 设备像素
export const devicePx = css => css * (globalThis.devicePixelRatio || 1)

// px：显示大小（设备像素），用于像素对齐；0 表示不对齐（导出、大图）
// 两级缓存：finalize 的结果只和「图标 + 圆角 + 线宽」有关，像素对齐再按 px 缓存——拖大小滑块时只重算对齐，不重跑 finalize
const finalized = new Map()
const hinted = new Map()
export function pathsOf(icon, corner, weight, px = 0) {
  const base = `${icon.name}|${corner.radius}|${weight.stroke}`
  let paths = finalized.get(base)
  if (!paths) {
    const stroke = weight.stroke
    const opts = { radius: corner.radius, stroke, weight: weight.id }
    paths = icon.animation ? animatedPaths(icon, opts, stroke) : finalize(icon.draw(opts), stroke)
    finalized.set(base, paths)
  }
  // 大尺寸、动画图标不对齐（见 hint），直接用 finalize 的结果
  if (!px || px / 24 >= HINT_MAX_SCALE || icon.animation)
    return paths
  const key = `${base}|${px}`
  let out = hinted.get(key)
  if (!out) {
    out = hint(paths, weight.stroke, px)
    hinted.set(key, out)
  }
  return out
}

// 所有格子共用一个 IntersectionObserver：进入、离开视口上下 600px 范围时都通知（一直观察，直到格子卸载）
const callbacks = new WeakMap()
const observer = typeof IntersectionObserver === 'undefined'
  ? null
  : new IntersectionObserver((entries) => {
    for (const e of entries)
      callbacks.get(e.target)?.(e.isIntersecting)
  }, { rootMargin: '600px 0px' })

export function observeVisibility(el, fn) {
  if (!observer)
    return fn(true)
  callbacks.set(el, fn)
  observer.observe(el)
}
export function forget(el) {
  observer?.unobserve(el)
  callbacks.delete(el)
}

// 整个 SVG 的描边属性：预览（IconSvg）和导出（App 的 toSvg）共用
// 尖角用方头（square）而不是平头（butt）：方头和圆头一样把线端往外延伸半个线宽，所以两种样式的几何完全一致——
// 图标都是按圆头的范围设计的，平头会让每个开放线端缩短半个线宽：加号、短横缩成点，两段线拼成的直角外侧缺一块，
// 接到别的线上的线头也会露出缝。斜接上限 2：夹角小于 60° 的锐角（A、V、M 的尖）自动切平，不会拉出长尖刺戳出外框
// colors：双色变体的颜色 { primary, danger, success, … }（角色见 tone.js）；不传就是单色（全部 currentColor）
// 预览用 CSS 变量（PREVIEW_COLORS，切换颜色不用重算路径），导出时传具体颜色值
export const svgAttrs = (stroke, sharp, colors) => ({
  'fill': 'none',
  'stroke': colors?.primary ?? 'currentColor',
  'stroke-width': stroke,
  'stroke-linecap': sharp ? 'square' : 'round',
  'stroke-linejoin': sharp ? 'miter' : 'round',
  'stroke-miterlimit': sharp ? 2 : undefined,
})

// 单条路径的 SVG 属性：点、细线、细节的线宽写在各自的路径上
export const pathAttrs = (p, colors) => {
  const color = p.tone && p.tone !== 'primary' ? colors?.[p.tone] : undefined
  return {
    'd': p.d,
    'stroke-width': p.width ? +p.width.toFixed(3) : undefined,
    'stroke': color,
    'fill': p.fill ? color ?? colors?.primary ?? 'currentColor' : undefined,
  }
}
// 预览：各角色用页面上的 CSS 变量（--icon-danger 等），单色模式下都是 currentColor
export const PREVIEW_COLORS = Object.fromEntries(Object.keys(ROLES).map(r => [r, `var(--icon-${r}, currentColor)`]))
