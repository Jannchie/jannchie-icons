// @jannchie/icons-react/static：配合 @jannchie/icons/static 的预计算图标（默认样式），不带渲染引擎，体积很小
// 不用 hook，可以直接在 React Server Components 里渲染；只支持 size、title
import { toPaths } from '@jannchie/icons/static'
import { forwardRef } from 'react'
import { renderSvg } from './attrs.js'

export const JIcon = forwardRef(function JIcon({ icon, size = 24, title, children, ...rest }, ref) {
  return renderSvg(size, toPaths(icon, { title }), { ...rest, ref }, children)
})

export default JIcon
