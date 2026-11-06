import { circle, crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 钻石：上方梯形 + 腰线 + 收到底部尖点的切面
export default ({ radius, stroke }) => [
  rounded([[7, 3.5], [17, 3.5], [21, 8.5], [12, 20], [3, 8.5]], Math.min(radius, 1)),
  'M3 8.5H21',
  'M9.5 8.5L12 20L14.5 8.5',
  'M7 3.5L9.5 8.5',
  'M17 3.5L14.5 8.5',
]

// 实心：钻石一块，切面线挖空：腰线两端、上切面线的上端各缩一个线宽，下切面线在离底尖还有一段处停下，不把底尖挖掉、也不把钻石切成碎块
export const fill = ({ radius, stroke }) => {
  // 线段 a→b，两端各缩 s0 / s1
  const cut = ([ax, ay], [bx, by], s0, s1) => {
    const l = Math.hypot(bx - ax, by - ay)
    const [ux, uy] = [(bx - ax) / l, (by - ay) / l]
    return `M${ax + ux * s0} ${ay + uy * s0}L${bx - ux * s1} ${by - uy * s1}`
  }
  return [
    solid(rounded([[7, 3.5], [17, 3.5], [21, 8.5], [12, 20], [3, 8.5]], Math.min(radius, 1))),
    knock([
      `M${3 + stroke} 8.5H${21 - stroke}`,
      cut([7, 3.5], [9.5, 8.5], stroke, 0),
      cut([17, 3.5], [14.5, 8.5], stroke, 0),
      cut([9.5, 8.5], [12, 20], 0, 3 * stroke),
      cut([14.5, 8.5], [12, 20], 0, 3 * stroke),
    ]),
  ]
}
