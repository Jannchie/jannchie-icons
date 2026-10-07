import { circle } from '../geometry'

// 快门速度：秒表（表盘 + 顶部按钮 + 斜向侧钮 + 指针）
// 按钮杆和指针落在 .5 上：整体偏左半格
const [cx, cy, r] = [11.5, 13.5, 7.5]

export default () => [
  circle(cx, cy, r),
  'M9 2.5H14',
  `M${cx} 2.5V${cy - r}`,
  'M17.75 7.25L19.25 5.75',
  `M${cx} ${cy}V9.5`,
]
