import { circle } from '../geometry'

// Hugging Face 任务：图机器学习。五个节点连成一圈（连线两端接在节点圆圈的边上）；最高的节点在 y = 5、最低的在 19，墨迹上下居中
// 不画对角线：同一节点上两条线的夹角不到 60° 时，挨着节点的那一段在常规字重下就粘在一起，五边形的对角线和邻边只差 36°
const nodes = [[5, 8], [12, 5], [19, 9], [8, 19], [17, 18.5]]
const links = [[0, 1], [1, 2], [0, 3], [2, 4], [3, 4]]
const r = 2

function edge(a, b) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1])
  const [ux, uy] = [(b[0] - a[0]) / len * r, (b[1] - a[1]) / len * r]
  return `M${a[0] + ux} ${a[1] + uy}L${b[0] - ux} ${b[1] - uy}`
}

export default () => [
  ...nodes.map(([x, y]) => circle(x, y, r)),
  ...links.map(([i, j]) => edge(nodes[i], nodes[j])),
]
