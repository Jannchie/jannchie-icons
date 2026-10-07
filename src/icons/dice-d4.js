import { crisp, rounded } from '../geometry'

// 四面骰（d4）：三角形外轮廓 + 从三个顶点连到中心的棱（顶点朝向看的人）
// 整体右移半格，上顶点连到中心的竖棱落在 12.5 上
const outer = [[12.5, 2.5], [21.5, 19.5], [3.5, 19.5]]
const c = [12.5, 13.75]
export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  ...outer.map(p => `M${p.join(' ')}L${c.join(' ')}`),
]
