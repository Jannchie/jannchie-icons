import { GAP } from '../clearance'
import { circle } from '../geometry'
import { clear, knock, solid } from '../solid'

// 绶带奖章：圆形徽章 + 下面挂着的两条飘带（尾端剪成燕尾）
export default ({ radius }) => [
  circle(12, 9, 6),
  { d: circle(12, 9, 3), thin: true },
  'M9.46 14.44L7.75 21L10.25 19.75L11.25 14.95',
  'M14.54 14.44L16.25 21L13.75 19.75L12.75 14.95',
]

// 实心：两条飘带各封口成一块，徽章四周让出缝再画实心圆，内圈细线挖空
export const fill = () => {
  const medal = circle(12, 9, 6)
  return [
    solid(['M9.46 14.44L7.75 21L10.25 19.75L11.25 14.95Z', 'M14.54 14.44L16.25 21L13.75 19.75L12.75 14.95Z']),
    clear(medal, GAP),
    solid(medal),
    knock({ d: circle(12, 9, 3), thin: true }),
  ]
}
