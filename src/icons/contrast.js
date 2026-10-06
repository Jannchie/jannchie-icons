import { circle } from '../geometry'

// 对比度：圆 + 右半边实心
const [cx, cy, r] = [12, 12, 8.5]

export default () => [
  circle(cx, cy, r),
  { d: `M${cx} ${cy - r}A${r} ${r} 0 0 1 ${cx} ${cy + r}Z`, fill: true },
]
