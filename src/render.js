// 图标路径的懒计算 + 缓存：finalize（裁切、合并）开销不小，上千个图标不能一打开页面就全算
// 按「图标名 + 圆角 + 字重 + 是否像素对齐」缓存，切回之前的设置不用重算
import { finalize, minify } from './svg'
import { translate } from './transform'

// 像素对齐：横竖线的坐标大多是整数或 .5。线条两条边要落在物理像素边界上才清晰：
// - 线宽 1、2 在 2 倍屏（24px 图标 = 48 物理像素）上，整数和 .5 坐标本来就清晰，不用动
// - 线宽 1.5 在 2 倍屏上是 3 个物理像素，中心要在 .25 / .75 上才清晰——整体平移 0.25，整数变 .25、.5 变 .75
// 偏移只有四分之一个单位，看不出图标不居中
export const pixelOffset = stroke => (Math.abs(stroke - 1.5) < 1e-6 ? 0.25 : 0)

const cache = new Map()
export function pathsOf(icon, corner, weight, align = true) {
  const key = `${icon.name}|${corner.radius}|${weight.stroke}|${align ? 1 : 0}`
  let paths = cache.get(key)
  if (!paths) {
    const stroke = weight.stroke
    const offset = align ? pixelOffset(stroke) : 0
    paths = finalize(icon.draw({ radius: corner.radius, stroke, weight: weight.id }), stroke)
      .map(p => (offset ? { ...p, d: minify(translate(p.d, offset, offset)) } : p))
    cache.set(key, paths)
  }
  return paths
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
export const svgAttrs = (stroke, sharp) => ({
  'fill': 'none',
  'stroke': 'currentColor',
  'stroke-width': stroke,
  'stroke-linecap': sharp ? 'square' : 'round',
  'stroke-linejoin': sharp ? 'miter' : 'round',
  'stroke-miterlimit': sharp ? 2 : undefined,
})

// 单条路径的 SVG 属性：点、细线、细节的线宽写在各自的路径上
export const pathAttrs = p => ({
  'd': p.d,
  'stroke-width': p.width ? +p.width.toFixed(3) : undefined,
  'fill': p.fill ? 'currentColor' : undefined,
})
