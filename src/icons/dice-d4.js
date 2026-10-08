import { crisp, rounded } from '../geometry'

// 四面骰（d4）：三角形外轮廓 + 从三个顶点连到中心的棱（顶点朝向看的人）
// 上顶点连到中心的竖棱在中轴 12 上
const outer = [[12, 2.5], [21, 19.5], [3, 19.5]]
const c = [12, 13.75]
export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  ...outer.map(p => `M${p.join(' ')}L${c.join(' ')}`),
]
