// 导出 SVG：预览站的「复制 / 下载」、核心包的 toSvg、Iconify JSON 共用
// 为了体积：属性相同的静态路径合并成一条，圆弧标志位紧排（见 minify 的 packArcs）；动画图标的路径带 <animate> 子元素
import { resolveOptions } from './options'
import { animateAttrs, pathAttrs, pathsOf, svgAttrs } from './render'
import { minify } from './svg'
import { ROLES } from './tone'

const attrs = obj => Object.entries(obj).filter(([, v]) => v !== undefined).map(([k, v]) => `${k}="${v}"`).join(' ')

// 双色的颜色：duo 为 false 时是单色；theme 选推荐色的亮 / 暗版本；colors 覆盖个别角色或 primary（不给 primary 就是 currentColor）
export function resolveColors({ duo = false, theme = 'light', colors = {} } = {}) {
  if (!duo)
    return undefined
  const roles = Object.fromEntries(Object.entries(ROLES).map(([r, c]) => [r, colors[r] ?? c[theme]]))
  return { primary: colors.primary, ...roles }
}

// 根元素以内的部分，一条 path 一行。paths：finalize 过的路径；colors：resolveColors 的结果
export function svgBody(paths, colors) {
  const merged = new Map()
  const animated = []
  for (const p of paths) {
    if (p.frames) {
      animated.push(`<path ${attrs(pathAttrs(p, colors))}><animate ${attrs(animateAttrs(p))}/></path>`)
      continue
    }
    const { d, ...rest } = pathAttrs(p, colors)
    const key = attrs(rest)
    merged.set(key, (merged.get(key) ?? '') + d)
  }
  return [...[...merged].map(([key, d]) => `<path ${attrs({ d: minify(d, { packArcs: true }) })}${key ? ` ${key}` : ''}/>`), ...animated]
}

// 完整的 SVG 文件。stroke、sharp：字重和圆角
export function svgString(paths, { stroke, sharp, colors, size = 24 }) {
  const body = svgBody(paths, colors).map(l => `  ${l}`).join('\n')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" ${attrs(svgAttrs(stroke, sharp, colors))}>\n${body}\n</svg>\n`
}

// Iconify 的 body：根元素上的描边属性挪到一层 <g> 上（Iconify 只保存 svg 以内的内容）
export const iconifyBody = (paths, { stroke, sharp, colors }) =>
  `<g ${attrs(svgAttrs(stroke, sharp, colors))}>${svgBody(paths, colors).join('')}</g>`

// 核心包的入口：icon 是 { name, draw, animation }；radius: 'sharp' | 0–3，weight: 'light' | 'regular' | 'bold' | 'heavy'
export function toSvg(icon, { radius, weight, size = 24, duo, theme, colors } = {}) {
  const o = resolveOptions({ radius, weight })
  return svgString(pathsOf(icon, o.corner, o.weight), { stroke: o.weight.stroke, sharp: !!o.corner.sharp, colors: resolveColors({ duo, theme, colors }), size })
}

// 给框架组件用：根元素属性和每条路径的属性（不拼字符串）；px 给出显示的设备像素数时做像素对齐
export function toPaths(icon, { radius, weight, duo, theme, colors, px = 0 } = {}) {
  const o = resolveOptions({ radius, weight })
  const c = resolveColors({ duo, theme, colors })
  return {
    svg: svgAttrs(o.weight.stroke, !!o.corner.sharp, c),
    paths: pathsOf(icon, o.corner, o.weight, px).map(p => ({ ...pathAttrs(p, c), animate: animateAttrs(p) ?? undefined })),
  }
}
