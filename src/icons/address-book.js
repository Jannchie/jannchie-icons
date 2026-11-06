import { circle, rounded } from '../geometry'
import { hole, solid } from '../solid'

// 通讯录：竖放的本子（6.5–19.5 × 3.5–20.5），左边缘两个装订扣（上下对称，落在 .5 上）（短横垂直接在左边上），本子里一个头像（头 + 肩）
export default ({ radius }) => [
  rounded([[6.5, 3.5], [19.5, 3.5], [19.5, 20.5], [6.5, 20.5]], Math.min(radius, 2)),
  'M4.5 8.5H6.5M4.5 15.5H6.5',
  circle(13, 10, 2.5),
  'M9 17A4 3.5 0 0 1 17 17',
]

// 实心：本子一块，头像（头 + 肩）整块挖空，挖出来的头和描边版头像的外缘一样大；装订扣照旧是短线
export const fill = ({ radius }) => [
  solid(rounded([[6.5, 3.5], [19.5, 3.5], [19.5, 20.5], [6.5, 20.5]], Math.min(radius, 2))),
  hole([circle(13, 10, 2.5), 'M9 17A4 3.5 0 0 1 17 17Z']),
  'M4.5 8.5H6.5M4.5 15.5H6.5',
]
