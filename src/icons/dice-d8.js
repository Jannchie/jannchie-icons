import { crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 八面骰（d8）：正六边形外轮廓 + 交替连三个外顶点的三角形正面
// 六边形略压扁：中轴在 12，竖边在 4 / 20，侧顶点在 7.5 / 16.5
const outer = [[12, 2.5], [20, 7.5], [20, 16.5], [12, 21.5], [4, 16.5], [4, 7.5]]
export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  rounded([outer[0], outer[2], outer[4]], crisp(radius)),
]

// 线段 a→b，两端各缩 s0 / s1（碰到外轮廓的那头缩一个线宽，挖空时不把骰子切开）
const cut = ([ax, ay], [bx, by], s0, s1) => {
  const l = Math.hypot(bx - ax, by - ay)
  const [ux, uy] = [(bx - ax) / l, (by - ay) / l]
  return `M${ax + ux * s0} ${ay + uy * s0}L${bx - ux * s1} ${by - uy * s1}`
}

// 实心：六边形一块，挖掉正面三角的三条边；三个顶点都在外轮廓上，每条边两头各缩一个线宽
export const fill = ({ radius, stroke }) => {
  const [a, b, c] = [outer[0], outer[2], outer[4]]
  return [
    solid(rounded(outer, crisp(radius))),
    knock([cut(a, b, stroke, stroke), cut(b, c, stroke, stroke), cut(c, a, stroke, stroke)]),
  ]
}
