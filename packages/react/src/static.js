// @jannchie/icons-react/static：配合 @jannchie/icons/static 的预计算图标（默认样式），不带渲染引擎，体积很小
// 不用 hook，可以直接在 React Server Components 里渲染；只支持 size、title
import { SVG_ATTRS } from '@jannchie/icons/static'
import { createElement as h, forwardRef } from 'react'
import { reactAttrs } from './attrs.js'

const ROOT = reactAttrs(SVG_ATTRS)

export const JIcon = forwardRef(function JIcon({ icon, size = 24, title, children, ...rest }, ref) {
  const body = icon.paths.map(({ animate, ...p }, i) => h('path', { key: i, ...reactAttrs(p) }, animate ? h('animate', animate) : null))
  if (title)
    body.unshift(h('title', { key: 'title' }, title))
  const a11y = title ? { role: 'img' } : { 'aria-hidden': 'true' }
  return h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24', ...ROOT, ...a11y, ...rest, ref }, body, children)
})

export default JIcon
