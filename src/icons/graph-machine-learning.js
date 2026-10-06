import { circle } from '../geometry'

// Hugging Face 任务：图机器学习。五个节点 + 连线（连线两端接在节点圆圈的边上）
const nodes = [[5, 7], [12, 4], [19, 8], [8, 18], [17, 17.5]]
const links = [[0, 1], [1, 2], [0, 3], [1, 3], [2, 4], [3, 4], [1, 4]]
const r = 1.75

function edge(a, b) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1])
  const [ux, uy] = [(b[0] - a[0]) / len * r, (b[1] - a[1]) / len * r]
  return `M${a[0] + ux} ${a[1] + uy}L${b[0] - ux} ${b[1] - uy}`
}

export default () => [
  ...nodes.map(([x, y]) => circle(x, y, r)),
  ...links.map(([i, j]) => edge(nodes[i], nodes[j])),
]
