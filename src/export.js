// 导出 SVG：预览站的「复制 / 下载」、核心包的 toSvg、Iconify JSON 共用
// 为了体积：属性相同的静态路径合并成一条，圆弧标志位紧排（见 minify 的 packArcs）；动画图标的路径带 <animate> 子元素
// 属性的转义、序列化和根元素属性在 svg-root.js（./static 入口也用它，不带渲染引擎）
import { resolveOptions } from './options'
import { animateAttrs, pathAttrs, pathsOf, svgAttrs } from './render'
import { minify } from './svg'
import { a11yAttrs, attrString, compact, escapeXml, pathTag, rootAttrs } from './svg-root'
import { ROLES } from './tone'

function checkIcon(icon) {
  if (!icon || typeof icon.draw !== 'function' || typeof icon.name !== 'string')
    throw new TypeError('Expected an icon object such as IconHeart from @jannchie/icons')
}

// 双色的颜色：duo 为 false 时是单色；theme 选推荐色的亮 / 暗版本；colors 覆盖个别角色或 primary（不给 primary 就是 currentColor）
export function resolveColors({ duo = false, theme = 'light', colors = {} } = {}) {
  if (!duo)
    return undefined
  const roles = Object.fromEntries(Object.entries(ROLES).map(([r, c]) => [r, colors[r] ?? c[theme]]))
  return { primary: colors.primary, ...roles }
}

// 合并后的路径属性：属性相同的静态路径合并成一条（d 紧排），动画路径带 animate。paths：finalize 过的路径；colors：resolveColors 的结果
export function mergedPaths(paths, colors) {
  const merged = new Map()
  const animated = []
  for (const p of paths) {
    if (p.frames) {
      animated.push(compact({ ...pathAttrs(p, colors), animate: animateAttrs(p) }))
      continue
    }
    const { d, ...rest } = compact(pathAttrs(p, colors))
    const key = attrString(rest)
    const m = merged.get(key)
    if (m)
      m.d += d
    else
      merged.set(key, { d, ...rest })
  }
  return [...[...merged.values()].map(p => ({ ...p, d: minify(p.d, { packArcs: true }) })), ...animated]
}

// 根元素以内的部分，一条 path 一行
export const svgBody = (paths, colors) => mergedPaths(paths, colors).map(pathTag)

// 完整的 SVG 文件。stroke、sharp：字重和圆角；title：<title> 子元素；attrs：根元素上额外的属性（覆盖同名的默认属性，null / undefined 去掉）
// a11y：按 title 加 role="img" 或 aria-hidden="true"（核心包的 toSvg 打开；预览站的复制 / 下载不加）
export function svgString(paths, { stroke, sharp, colors, size = 24, title, attrs: extra, a11y = false }) {
  const lines = svgBody(paths, colors)
  if (title)
    lines.unshift(`<title>${escapeXml(title)}</title>`)
  const root = { ...rootAttrs(size), ...svgAttrs(stroke, sharp, colors), ...(a11y && a11yAttrs(title)), ...extra }
  return `<svg${attrString(root)}>\n${lines.map(l => `  ${l}`).join('\n')}\n</svg>\n`
}

// Iconify 的 body：根元素上的描边属性挪到一层 <g> 上（Iconify 只保存 svg 以内的内容）
export const iconifyBody = (paths, { stroke, sharp, colors }) =>
  `<g${attrString(svgAttrs(stroke, sharp, colors))}>${svgBody(paths, colors).join('')}</g>`

// 核心包的入口：icon 是 { name, draw, animation }；radius: 'sharp' | 0–3，weight: 'light' | 'regular' | 'bold'
// size：数字（px）或带单位的字符串（'1em'）；title：给了就是 role="img" + <title>，否则 aria-hidden="true"；attrs：根元素上额外的属性
export function toSvg(icon, { radius, weight, size = 24, duo, theme, colors, title, attrs } = {}) {
  checkIcon(icon)
  const o = resolveOptions({ radius, weight })
  return svgString(pathsOf(icon, o.corner, o.weight), {
    stroke: o.weight.stroke,
    sharp: !!o.corner.sharp,
    colors: resolveColors({ duo, theme, colors }),
    size,
    title,
    attrs,
    a11y: true,
  })
}

// 给框架组件用：根元素属性和每条路径的属性（不拼字符串、不转义，由框架负责）；px 给出显示的设备像素数时做像素对齐
// 给了 title 时返回 title 字段，由组件渲染成 <title> 子元素
export function toPaths(icon, { radius, weight, duo, theme, colors, px = 0, title, attrs } = {}) {
  checkIcon(icon)
  const o = resolveOptions({ radius, weight })
  const c = resolveColors({ duo, theme, colors })
  const out = {
    svg: compact({ ...svgAttrs(o.weight.stroke, !!o.corner.sharp, c), ...a11yAttrs(title), ...attrs }),
    paths: pathsOf(icon, o.corner, o.weight, px).map(p => ({ ...pathAttrs(p, c), animate: animateAttrs(p) ?? undefined })),
  }
  if (title)
    out.title = String(title)
  return out
}
