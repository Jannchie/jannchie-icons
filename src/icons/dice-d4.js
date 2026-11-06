import { crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 四面骰（d4）：三角形外轮廓 + 从三个顶点连到中心的棱（顶点朝向看的人）
// 上顶点连到中心的竖棱在中轴 12 上
const outer = [[12, 2.5], [21, 19.5], [3, 19.5]]
const c = [12, 13.75]
export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  ...outer.map(p => `M${p.join(' ')}L${c.join(' ')}`),
]

// 线段 a→b，两端各缩 s0 / s1（碰到外轮廓的那头缩一个线宽，挖空时不把骰子切开）
const cut = ([ax, ay], [bx, by], s0, s1) => {
  const l = Math.hypot(bx - ax, by - ay)
  const [ux, uy] = [(bx - ax) / l, (by - ay) / l]
  return `M${ax + ux * s0} ${ay + uy * s0}L${bx - ux * s1} ${by - uy * s1}`
}

// 实心：三角一块，挖掉三条棱（外顶点那头缩一个线宽）
export const fill = ({ radius, stroke }) => [
  solid(rounded(outer, crisp(radius))),
  knock(outer.map(p => cut(c, p, 0, stroke))),
]
