import { circle } from '../geometry'

// 快门速度：秒表（表盘 + 顶部按钮 + 斜向侧钮 + 指针）
const [cx, cy, r] = [12, 13.5, 7.5]

export default () => [
  circle(cx, cy, r),
  'M9.5 2.5H14.5',
  `M${cx} 2.5V${cy - r}`,
  'M18.25 7.25L19.75 5.75',
  `M${cx} ${cy}V9.5`,
]
