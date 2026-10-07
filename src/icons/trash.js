import { rounded } from '../geometry'

// 删除：桶盖 + 提手 + 桶身（开口朝上）+ 两道竖线
export default ({ radius }) => [
  'M4 6.5H20',
  rounded([[9.5, 6.5], [9.5, 3.5], [14.5, 3.5], [14.5, 6.5]], Math.min(radius, 1), false),
  rounded([[6.5, 6.5], [6.5, 20.5], [17.5, 20.5], [17.5, 6.5]], Math.min(radius, 2.5), false),
  'M9.5 10.5V16.5',
  'M14.5 10.5V16.5',
]
