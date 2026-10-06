import { circle } from '../geometry'

// 神经网络：三层节点（2 - 3 - 2），相邻两层全连接；连线的两端正好接在节点圆圈的边上
const layers = [
  [[3.5, 8], [3.5, 16]],
  [[12, 4.25], [12, 12], [12, 19.75]],
  [[20.5, 8], [20.5, 16]],
]
const r = 1.75

function edge(a, b) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1])
  const [ux, uy] = [(b[0] - a[0]) / len * r, (b[1] - a[1]) / len * r]
  return `M${a[0] + ux} ${a[1] + uy}L${b[0] - ux} ${b[1] - uy}`
}

export default () => {
  const edges = []
  for (let i = 0; i < layers.length - 1; i++) {
    for (const a of layers[i]) {
      for (const b of layers[i + 1])
        edges.push(edge(a, b))
    }
  }
  return [...layers.flat().map(([x, y]) => circle(x, y, r)), ...edges]
}
