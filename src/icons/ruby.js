import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// Ruby：宝石。上沿 7.5–16.5、腰线 y 9.5（3.5–20.5）、底尖 (12, 20.5)
// 冠部是一排三角形切面：上沿的三个点（两角 + 中点）和腰线上的两个点（9.5、14.5）连成一条 W 形折线
// 亭部从腰线上的这两个点收到底尖；和 diamond 的区别是冠部多了中间那个尖
export default ({ radius }) => [
  rounded([[7.5, 4.5], [16.5, 4.5], [20.5, 9.5], [12, 20.5], [3.5, 9.5]], Math.min(radius, 1)),
  'M3.5 9.5H20.5',
  'M7.5 4.5L9.5 9.5L12 4.5L14.5 9.5L16.5 4.5',
  'M9.5 9.5L12 20.5L14.5 9.5',
]

// 线段 a→b，两端各缩 s0 / s1
const cut = ([ax, ay], [bx, by], s0, s1) => {
  const l = Math.hypot(bx - ax, by - ay)
  const [ux, uy] = [(bx - ax) / l, (by - ay) / l]
  return `M${ax + ux * s0} ${ay + uy * s0}L${bx - ux * s1} ${by - uy * s1}`
}

// 实心：宝石一块，切面线挖空（同 diamond）：腰线两端、冠部切面线的上端各缩一个线宽，
// 亭部切面线在离底尖还有一段处停下，不把底尖挖掉、也不把宝石切成碎块
export const fill = ({ radius, stroke }) => [
  solid(rounded([[7.5, 4.5], [16.5, 4.5], [20.5, 9.5], [12, 20.5], [3.5, 9.5]], Math.min(radius, 1))),
  knock([
    `M${3.5 + stroke} 9.5H${20.5 - stroke}`,
    cut([7.5, 4.5], [9.5, 9.5], stroke, 0),
    cut([12, 4.5], [9.5, 9.5], stroke, 0),
    cut([12, 4.5], [14.5, 9.5], stroke, 0),
    cut([16.5, 4.5], [14.5, 9.5], stroke, 0),
    cut([9.5, 9.5], [12, 20.5], 0, 3 * stroke),
    cut([14.5, 9.5], [12, 20.5], 0, 3 * stroke),
  ]),
]
