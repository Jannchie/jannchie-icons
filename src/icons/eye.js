import { circle } from '../geometry'
import { knock, solid } from '../solid'

// 可见：杏仁形眼睛 + 瞳孔
export default ({ radius }) => [
  'M2.5 12C5 7.25 8.25 5 12 5C15.75 5 19 7.25 21.5 12C19 16.75 15.75 19 12 19C8.25 19 5 16.75 2.5 12Z',
  circle(12, 12, 3),
]

// 实心：眼形一块，挖掉瞳孔的圆圈，瞳孔留成实心圆
export const fill = () => [
  solid('M2.5 12C5 7.25 8.25 5 12 5C15.75 5 19 7.25 21.5 12C19 16.75 15.75 19 12 19C8.25 19 5 16.75 2.5 12Z'),
  knock(circle(12, 12, 3)),
]
