import { circle, crisp, rounded } from '../geometry'
import { solid } from '../solid'

// 水平均分：左右两道竖线 + 中间一个方块
export default ({ radius, stroke }) => [
  'M4.5 3.5V20.5',
  'M19.5 3.5V20.5',
  rounded([[8.5, 7.5], [15.5, 7.5], [15.5, 16.5], [8.5, 16.5]], Math.min(radius, 1.5)),
]

// 实心：中间的方块填实，两道竖线照旧是线
export const fill = ({ radius }) => [
  'M4.5 3.5V20.5',
  'M19.5 3.5V20.5',
  solid(rounded([[8.5, 7.5], [15.5, 7.5], [15.5, 16.5], [8.5, 16.5]], Math.min(radius, 1.5))),
]
