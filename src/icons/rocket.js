import { circle, crisp, rounded } from '../geometry'
import { hole, solid } from '../solid'
import { mirror, rotate, scale } from '../transform'

// 火箭：竖直画（尖头、圆窗、两侧尾翼、尾焰），再顺时针转 45°
export default ({ radius, stroke }) => [
  rotate('M12 2.5C15.5 5.5 16 10 15.5 15.5H8.5C8 10 8.5 5.5 12 2.5Z', 45),
  rotate(circle(12, 9, 1.75), 45),
  rotate('M8.5 12L5.5 15.5V18.5L8.5 16.5', 45),
  rotate('M15.5 12L18.5 15.5V18.5L15.5 16.5', 45),
  rotate('M10.5 18L12 21L13.5 18', 45),
]

// 实心：箭身连两侧尾翼一块（尾翼封口），圆窗挖成洞（洞外扩半个线宽后正好是描边版圆窗的中心线）；尾焰照旧是线
export const fill = ({ stroke }) => [
  solid([
    'M12 2.5C15.5 5.5 16 10 15.5 15.5H8.5C8 10 8.5 5.5 12 2.5Z',
    'M8.5 12L5.5 15.5V18.5L8.5 16.5Z',
    'M15.5 12L18.5 15.5V18.5L15.5 16.5Z',
  ].map(d => rotate(d, 45))),
  hole(rotate(circle(12, 9, 1.75 - stroke / 2), 45)),
  rotate('M10.5 18L12 21L13.5 18', 45),
]
