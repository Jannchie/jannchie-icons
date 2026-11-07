import { rounded } from '../geometry'
import { dot, eye } from '../scene'
import { knock, solid } from '../solid'

// 多米诺骨牌：竖长圆角牌 + 中间分隔线 + 上半两点、下半三点（斜排）
export default ({ radius }) => [
  rounded([[7.5, 3], [16.5, 3], [16.5, 21], [7.5, 21]], Math.min(radius, 2)),
  'M7.5 12H16.5',
  dot(10, 5.5, 2.5),
  dot(14, 9.5, 2.5),
  dot(9.75, 14.25, 2.5),
  dot(12, 16.5, 2.5),
  dot(14.25, 18.75, 2.5),
]

// 实心：骨牌一块，分隔线一直挖穿两侧，牌分成上下两块；再挖掉五个点；
// 点用 eye：尖角模式下也是圆点、粗字重下不再变大（方点挨得近，尖角粗字重下会连成一片）
export const fill = ({ radius, stroke }) => [
  solid(rounded([[7.5, 3], [16.5, 3], [16.5, 21], [7.5, 21]], Math.min(radius, 2))),
  knock([
    `M${7.5 - stroke} 12H${16.5 + stroke}`,
    eye(10, 5.5, 2.5),
    eye(14, 9.5, 2.5),
    eye(9.75, 14.25, 2.5),
    eye(12, 16.5, 2.5),
    eye(14.25, 18.75, 2.5),
  ]),
]
