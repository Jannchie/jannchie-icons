import { circle, crisp, rounded } from '../geometry'
import { mirror, rotate, scale } from '../transform'

// 火箭：竖直画（尖头、圆窗、两侧尾翼、尾焰），再顺时针转 45°
export default ({ radius, stroke }) => [
  rotate('M12 2.5C15.5 5.5 16 10 15.5 15.5H8.5C8 10 8.5 5.5 12 2.5Z', 45),
  rotate(circle(12, 9, 1.75), 45),
  rotate('M8.5 12L5.5 15.5V18.5L8.5 16.5', 45),
  rotate('M15.5 12L18.5 15.5V18.5L15.5 16.5', 45),
  rotate('M10.5 18L12 21L13.5 18', 45),
]
