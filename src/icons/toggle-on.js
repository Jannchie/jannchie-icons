import { circle, rounded } from '../geometry'

// 拨动开关（开）：胶囊形底座（2.5–21.5 × 6.5–17.5）+ 靠右的实心旋钮
export default ({ radius }) => [
  rounded([[2.5, 6.5], [21.5, 6.5], [21.5, 17.5], [2.5, 17.5]], Math.min(Math.max(radius, 0) * 2.75, 5.5)),
  { d: `${circle(16, 12, 3)}Z`, fill: true },
]
