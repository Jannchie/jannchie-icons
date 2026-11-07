import { rounded } from '../geometry'
import { spans, tile } from '../solid'

// 俄罗斯方块：一个 T 形块（一整块轮廓 + 细线分成四格），格子 6 见方，居中摆放
export default ({ radius }) => [
  rounded([[3, 6], [21, 6], [21, 12], [15, 12], [15, 18], [9, 18], [9, 12], [3, 12]], Math.min(radius, 1)),
  { d: 'M9 6V12', thin: true },
  { d: 'M15 6V12', thin: true },
  { d: 'M9 12H15', thin: true },
]

// 实心：四个独立的方块（见 solid.js 的 tile），块和块之间留 GAP 的缝；外缘和描边版的墨迹一致（T 的外轮廓不变）。
// 格子只有 6 见方，圆角最多 0.5（和整块 T 一样用 1 会圆成一团）
export const fill = ({ radius, stroke }) => {
  const [l, m, r] = spans(3, 21, [9, 15], stroke)
  const [top, stem] = spans(6, 18, [12], stroke)
  const k = Math.min(radius, 0.5)
  return [[l, top], [m, top], [r, top], [m, stem]].map(([[x0, x1], [y0, y1]]) => tile([x0, y0, x1, y1], k))
}
