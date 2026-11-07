import { crisp, rounded, through } from '../geometry'
import { knock, solid } from '../solid'

// 四面骰（d4）：三角形外轮廓 + 从三个顶点连到中心的棱（顶点朝向看的人）
// 上顶点连到中心的竖棱在中轴 12 上
const outer = [[12, 2.5], [21, 19.5], [3, 19.5]]
const c = [12, 13.75]
export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  ...outer.map(p => `M${p.join(' ')}L${c.join(' ')}`),
]

// 实心：三角一块，挖掉三条棱，棱穿出三个顶点，骰子分成三个面
export const fill = ({ radius, stroke }) => [
  solid(rounded(outer, crisp(radius))),
  knock(outer.map(p => through(c, p, 0, 2 * stroke))),
]
