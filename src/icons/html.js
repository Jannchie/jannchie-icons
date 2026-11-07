import { rounded } from '../geometry'
import { eye } from '../scene'
import { knock, solid } from '../solid'
import base from './window'

// HTML：窗口 + 中间的 </>
// 窗口内容区 x 3.5–20.5、y 8.5–19.5：共用的 code 符号只有 7 宽，放进来三笔挤在一起；
// 这里单独画得更开——尖括号 2.5 宽、6 高，斜杠居中，和两边尖括号各留约 2 的空
export default opts => [
  ...base(opts),
  'M9 11L6 14L9 17',
  'M15 11L18 14L15 17',
  'M13 10.5L11 17.5',
]

// 实心：窗口一块（同 window 的外框），标题栏分隔线挖穿两侧，标题栏成了单独的一块；再挖掉三个小圆点和 </>；
// 小圆点用 eye：尖角模式下也是圆点、粗字重下不再变大（方点挨得近，尖角粗字重下会连成一片）
export const fill = ({ radius, stroke }) => [
  solid(rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], Math.min(radius, 2.5))),
  knock([
    `M${3.5 - stroke} 8.5H${20.5 + stroke}`,
    ...[6, 8.5, 11].map(x => eye(x, 6.5, 1.5)),
    'M9 11L6 14L9 17',
    'M15 11L18 14L15 17',
    'M13 10.5L11 17.5',
  ]),
]
