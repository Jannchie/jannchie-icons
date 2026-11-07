import { rounded } from '../geometry'
import { dot, eye } from '../scene'
import { knock, solid } from '../solid'

// 掌机：竖长机身 + 上方屏幕 + 左下十字键 + 右下两个按键
export default ({ radius }) => [
  rounded([[5.5, 2.5], [18.5, 2.5], [18.5, 21.5], [5.5, 21.5]], Math.min(radius, 2.5)),
  rounded([[8.5, 5.5], [15.5, 5.5], [15.5, 11.5], [8.5, 11.5]], Math.min(radius, 1)),
  'M8.5 16.5H12.5',
  'M10.5 14.5V18.5',
  dot(14.5, 17.5),
  dot(16, 15.5),
]

// 实心：机身一块，挖掉屏幕的轮廓（屏幕留成实心）、十字键和两个按键；
// 按键点用 eye：尖角模式下也是圆点、粗字重下不再变大（方点挨得近，尖角粗字重下会连成一片）
export const fill = ({ radius }) => [
  solid(rounded([[5.5, 2.5], [18.5, 2.5], [18.5, 21.5], [5.5, 21.5]], Math.min(radius, 2.5))),
  knock([
    rounded([[8.5, 5.5], [15.5, 5.5], [15.5, 11.5], [8.5, 11.5]], Math.min(radius, 1)),
    'M8.5 16.5H12.5',
    'M10.5 14.5V18.5',
    eye(14.5, 17.5),
    eye(16, 15.5),
  ]),
]
