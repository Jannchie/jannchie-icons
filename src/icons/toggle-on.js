import { circle, rounded } from '../geometry'
import { hole, solid } from '../solid'

// 拨动开关（开）：胶囊形底座（2.5–21.5 × 6.5–17.5）+ 靠右的实心旋钮
export default ({ radius }) => [
  rounded([[2.5, 6.5], [21.5, 6.5], [21.5, 17.5], [2.5, 17.5]], Math.min(Math.max(radius, 0) * 2.75, 5.5)),
  { d: `${circle(16, 12, 3)}Z`, fill: true },
]

// 实心：底座一块，旋钮挖空成一个圆洞（洞和描边版实心旋钮一样大）；开、关只看旋钮在左还是在右
export const fill = ({ radius }) => [
  solid(rounded([[2.5, 6.5], [21.5, 6.5], [21.5, 17.5], [2.5, 17.5]], Math.min(Math.max(radius, 0) * 2.75, 5.5))),
  hole(circle(16, 12, 3)),
]
