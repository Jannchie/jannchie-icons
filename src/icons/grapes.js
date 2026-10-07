import { circle } from '../geometry'

// 葡萄：三二一排成倒三角的六颗 + 果梗（整体右移半格，果梗落在 12.5 上）
export default ({ radius }) => [
  circle(8, 9, 2.1),
  circle(12.5, 9, 2.1),
  circle(17, 9, 2.1),
  circle(10.25, 13, 2.1),
  circle(14.75, 13, 2.1),
  circle(12.5, 17, 2.1),
  'M12.5 6.9V3',
  'M12.5 4.5C13.5 3.5 15 3.25 16.5 3.75',
]
