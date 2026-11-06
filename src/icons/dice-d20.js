import { crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 二十面骰（d20）：正六边形外轮廓 + 中间朝上的三角形正面 + 正面每个顶点连到附近三个外顶点的棱
// 棱线都接在外轮廓顶点上，所以外轮廓只用 crisp 小圆角
// 六边形略压扁：中轴在 12，竖边在 4 / 20，侧顶点在 7.5 / 16.5
const outer = [[12, 2.5], [20, 7.5], [20, 16.5], [12, 21.5], [4, 16.5], [4, 7.5]]
const [t, l, r] = [[12, 7.5], [7.5, 15.5], [16.5, 15.5]]
const edge = (a, b) => `M${a.join(' ')}L${b.join(' ')}`

export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  rounded([t, r, l], crisp(radius)),
  edge(t, outer[0]), edge(t, outer[1]), edge(t, outer[5]),
  edge(l, outer[5]), edge(l, outer[4]), edge(l, outer[3]),
  edge(r, outer[1]), edge(r, outer[2]), edge(r, outer[3]),
]

// 线段 a→b，两端各缩 s0 / s1（碰到外轮廓的那头缩一个线宽，挖空时不把骰子切开）
const cut = ([ax, ay], [bx, by], s0, s1) => {
  const l = Math.hypot(bx - ax, by - ay)
  const [ux, uy] = [(bx - ax) / l, (by - ay) / l]
  return `M${ax + ux * s0} ${ay + uy * s0}L${bx - ux * s1} ${by - uy * s1}`
}

// 实心：六边形一块，挖掉三角正面和九条棱（外顶点那头缩一个线宽）
export const fill = ({ radius, stroke }) => [
  solid(rounded(outer, crisp(radius))),
  knock([
    rounded([t, r, l], crisp(radius)),
    ...[[t, 0], [t, 1], [t, 5], [l, 5], [l, 4], [l, 3], [r, 1], [r, 2], [r, 3]].map(([p, i]) => cut(p, outer[i], 0, stroke)),
  ]),
]
