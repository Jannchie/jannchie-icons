// 两个入口共用的纯函数：属性名转换、<svg> 的渲染。不调用 hook（./static 要能在 React Server Components 里用，那里没有 createContext）
// 尺寸解析等和框架无关的部分在 @jannchie/icons/runtime（Vue 包也用）
import { rootAttrs } from '@jannchie/icons/runtime'
import { createElement as h } from 'react'

// SVG 属性名换成 React 的写法：stroke-width → strokeWidth；aria-*、data-* 保持原样
export function reactAttrs(o) {
  const out = {}
  for (const k in o) {
    if (o[k] != null)
      out[k.startsWith('aria-') || k.startsWith('data-') ? k : k.replace(/-([a-z])/g, (_, c) => c.toUpperCase())] = o[k]
  }
  return out
}

// <svg>：根属性 + 可选的 <title> + 每条路径（动画路径带 <animate>）；shape 是 toPaths 形状的 { svg, paths, title? }
// props：调用方的其余属性（className、style、事件……），覆盖默认；children 跟在路径后面
export function renderSvg(size, { svg, paths, title }, props, children) {
  const body = paths.map(({ animate, ...p }, i) => h('path', { key: i, ...reactAttrs(p) }, animate ? h('animate', animate) : null))
  if (title)
    body.unshift(h('title', { key: 'title' }, title))
  return h('svg', { ...rootAttrs(size), ...reactAttrs(svg), ...props }, body, children)
}
