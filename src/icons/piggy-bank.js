import { eye } from '../scene'

// 存钱罐（侧视、猪鼻朝右）：椭圆猪身（中心 11, 13，半轴 8 × 6）+ 前面的猪鼻 + 头顶的尖耳 + 两条短腿 + 背上的投币口 + 眼睛（离猪身轮廓和猪鼻都留开）+ 左边小尾巴
const [cx, cy, rx, ry] = [11, 13, 8, 6]
// 猪身上 y 处的右侧 x、x 处的上 / 下沿 y
const right = y => +(cx + rx * Math.sqrt(1 - ((y - cy) / ry) ** 2)).toFixed(3)
const topAt = x => +(cy - ry * Math.sqrt(1 - ((x - cx) / rx) ** 2)).toFixed(3)
const bottomAt = x => +(cy + ry * Math.sqrt(1 - ((x - cx) / rx) ** 2)).toFixed(3)
export default () => [
  `M${cx - rx} ${cy}A${rx} ${ry} 0 0 1 ${cx + rx} ${cy}A${rx} ${ry} 0 0 1 ${cx - rx} ${cy}Z`,
  `M${right(10.5)} 10.5H21.5V14.5H${right(14.5)}`,
  `M13.5 ${topAt(13.5)}L15.5 4.5L16.5 ${topAt(16.5)}`,
  `M7.5 ${bottomAt(7.5)}V21`,
  `M14.5 ${bottomAt(14.5)}V21`,
  'M9.5 9.5H13.5',
  eye(15.5, 11),
  'M3.05 12C1.5 12 1.5 9.5 3 9.5',
]
