import { crisp, rounded } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 六面骰（d6，立体）：30° 等距视角的立方体（六边形外轮廓 + Y 形棱）+ 三个面上各一个点
// 六边形略压扁：中轴在 12，竖边在 4 / 20，侧顶点在 7.5 / 16.5
const outer = [[12, 2.5], [20, 7.5], [20, 16.5], [12, 21.5], [4, 16.5], [4, 7.5]]
export default ({ radius }) => [
  rounded(outer, crisp(radius)),
  'M4 7.5L12 12.5L20 7.5',
  'M12 12.5V21.5',
  dot(12, 7.5, 2.5),
  dot(8, 14.5, 2.5),
  dot(16, 14.5, 2.5),
]

// 线段 a→b，两端各缩 s0 / s1（碰到外轮廓的那头缩一个线宽，挖空时不把骰子切开）
const cut = ([ax, ay], [bx, by], s0, s1) => {
  const l = Math.hypot(bx - ax, by - ay)
  const [ux, uy] = [(bx - ax) / l, (by - ay) / l]
  return `M${ax + ux * s0} ${ay + uy * s0}L${bx - ux * s1} ${by - uy * s1}`
}

// 实心：六边形一块，挖掉 Y 形棱（外顶点那头缩一个线宽）和三个点
export const fill = ({ radius, stroke }) => {
  const c = [12, 12.5]
  return [
    solid(rounded(outer, crisp(radius))),
    knock([
      cut(c, [4, 7.5], 0, stroke),
      cut(c, [20, 7.5], 0, stroke),
      cut(c, [12, 21.5], 0, stroke),
      dot(12, 7.5, 2.5),
      dot(8, 14.5, 2.5),
      dot(16, 14.5, 2.5),
    ]),
  ]
}
