// 图标路径的懒计算 + 缓存：finalize（裁切、合并）开销不小，上千个图标不能一打开页面就全算
// 按「图标名 + 圆角 + 字重 + 对齐用的显示像素数」缓存，切回之前的设置不用重算
// 发布包也打这个模块：不要在顶层碰 DOM、全局对象（只给预览站用的东西放 site/preview.js）
import { axisLines, finalize, minify } from './svg'
import { affine, mapPath } from './transform'

// 像素对齐：按图标实际显示的设备像素数 px，把图标整体对齐到像素网格。图形本身不变形，只做两件事：
// - 线宽不取整（只保证至少 1 个设备像素）：取整会让三档字重在小尺寸下变成一样粗（16px 下全是 1 像素），
//   24px 的常规 1.5 也会被取成 2 像素、和粗体一样。保留实际线宽，字重层次在各尺寸都看得出来
// - 整体平移不到半个像素，让横竖线的一条边（外缘）落在像素边界上：线宽是小数时两条边不可能同时对齐，
//   对齐一条边、另一条边留半个像素的灰，比两条边都发虚清楚得多。图标按「外缘落在整数上」设计时（线宽变粗只往里长），
//   左右、上下两侧的外缘能同时对齐。x、y 各挑一个平移量，让（按长度加权）落到网格上的边最多。
//   不逐点吸附——逐点取整会把一两个像素大的小字挤成一团
// 每个网格单位有 HINT_MAX_SCALE 个设备像素以上时虚边已经不明显，不处理；只用于屏幕显示，导出的 SVG 不做（不知道会用在多大）
const HINT_MAX_SCALE = 3
// 图标里的横竖线段：[轴向, 坐标, 长度, 线宽]
const axisLinesOf = (paths, widthOf) => paths.flatMap(p => axisLines(p.d).map(l => [...l, widthOf(p)]))
// 在 [-0.5, 0.5) 设备像素里挑平移量：候选是让某一条线正好对齐的平移，得分是所有线到网格的距离（按长度加权）之和
function bestShift(lines, k) {
  if (!lines.length)
    return 0
  const frac = v => v - Math.round(v)
  // 一条线的两条边（设备像素）：中心 ± 半个线宽；离网格的偏差取两条边里较近的那条
  const edges = ([, v, , n]) => [v * k - n / 2, v * k + n / 2]
  const miss = (l, dx) => Math.min(...edges(l).map(e => Math.abs(frac(e + dx))))
  const cost = dx => lines.reduce((s, l) => s + l[2] * miss(l, dx), 0)
  let best = [0, cost(0)]
  for (const dx of lines.flatMap(l => edges(l).map(e => -frac(e)))) {
    const c = cost(dx)
    if (c < best[1] - 1e-9 || (Math.abs(c - best[1]) < 1e-9 && Math.abs(dx) < Math.abs(best[0])))
      best = [dx, c]
  }
  return best[0]
}
function hint(paths, stroke, px) {
  const k = px / 24
  // 线宽（设备像素）：不取整，只保证至少 1 像素；点向下取整到整像素（点要吸到像素中心才实），但不小于主线宽
  const line = Math.max(1, stroke * k)
  const pxWidth = p => p.detail
    ? (p.width ?? stroke) * k
    : p.dot ? Math.max(Math.ceil(line - 1e-9), Math.floor(p.width * k)) : Math.max(1, (p.width ?? stroke) * k)
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

// px：显示大小（设备像素），用于像素对齐；0 表示不对齐（导出、大图）
// 两级缓存：finalize 的结果只和「图标 + 圆角（尖角单独一份：方头线帽要缩线头，见 fitSquareCaps）+ 线宽」有关，像素对齐再按 px 缓存——拖大小滑块时只重算对齐，不重跑 finalize
const finalized = new Map()
const hinted = new Map()
export function pathsOf(icon, corner, weight, px = 0) {
  // 尖角单独一份（finalize 要缩方头线帽）；动画图标不走 fitSquareCaps，和 0 圆角共用
  const base = `${icon.name}|${corner.sharp && !icon.animation ? 'sharp' : corner.radius}|${weight.stroke}`
  let paths = finalized.get(base)
  if (!paths) {
    const stroke = weight.stroke
    const opts = { radius: corner.radius, stroke, weight: weight.id }
    paths = icon.animation ? animatedPaths(icon, opts, stroke) : finalize(icon.draw(opts), stroke, { sharp: !!corner.sharp })
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

// 整个 SVG 的描边属性：预览（IconSvg）和导出（App 的 toSvg）共用
// 尖角用方头（square）而不是平头（butt）：方头和圆头一样把线端往外延伸半个线宽，所以两种样式的几何完全一致——
// 图标都是按圆头的范围设计的，平头会让每个开放线端缩短半个线宽：加号、短横缩成点，两段线拼成的直角外侧缺一块，
// 接到别的线上的线头也会露出缝。斜接上限 2：夹角小于 60° 的锐角（A、V、M 的尖）自动切平，不会拉出长尖刺戳出外框
// colors：双色变体的颜色 { primary, danger, success, … }（角色见 tone.js）；不传就是单色（全部 currentColor）
// 预览用 CSS 变量（site/preview.js 的 PREVIEW_COLORS，切换颜色不用重算路径），导出时传具体颜色值
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
    // 尖角模式下也要圆角的路径（见 svg.js 的 round）；圆角模式下和根元素一样，写上也无妨
    'stroke-linecap': p.round ? 'round' : undefined,
    'stroke-linejoin': p.round ? 'round' : undefined,
  }
}
