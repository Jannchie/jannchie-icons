import { circle } from '../geometry'
import { ring } from '../marks'
import { hole, knock, solid } from '../solid'

// 折扣：圆环 + 中间的百分号
export default ({ radius }) => [
  ring(),
  'M15 9L9 15',
  circle(9.25, 9.25, 1.25),
  circle(14.75, 14.75, 1.25),
]

// 实心：圆盘一块，百分号挖空：斜线挖成缝，两个小圆挖成洞（洞外扩半个线宽后和描边版小圆的外缘一样大）
export const fill = () => [
  solid(ring()),
  knock('M15 9L9 15'),
  hole([circle(9.25, 9.25, 1.25), circle(14.75, 14.75, 1.25)]),
]
