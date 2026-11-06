import { circle } from '../geometry'
import { knock, solid } from '../solid'

// 快门速度：秒表（表盘 + 顶部按钮 + 斜向侧钮 + 指针）
const [cx, cy, r] = [12, 13.5, 7.5]

export default () => [
  circle(cx, cy, r),
  'M9.5 2.5H14.5',
  `M${cx} 2.5V${cy - r}`,
  'M18.25 7.25L19.75 5.75',
  `M${cx} ${cy}V9.5`,
]

// 实心：表盘一块，挖掉指针；顶部按钮、侧钮照旧是线
export const fill = () => [
  solid(circle(cx, cy, r)),
  knock(`M${cx} ${cy}V9.5`),
  'M9.5 2.5H14.5',
  `M${cx} 2.5V${cy - r}`,
  'M18.25 7.25L19.75 5.75',
]
