import { circle } from '../geometry'

// 葡萄：三二一排成倒三角的六颗 + 果梗
export default ({ radius }) => [
  circle(7.5, 9, 2.1),
  circle(12, 9, 2.1),
  circle(16.5, 9, 2.1),
  circle(9.75, 13, 2.1),
  circle(14.25, 13, 2.1),
  circle(12, 17, 2.1),
  'M12 6.9V3',
  'M12 4.5C13 3.5 14.5 3.25 16 3.75',
]
