import { circle } from '../geometry'

// 调节：三道横线，各有一个圆形滑块；滑块作为 cut，横线在滑块处真正断开
const knobs = [[15, 6], [8, 12], [13, 18]]

export default () => [
  ...knobs.map(([, y]) => `M3 ${y}H21`),
  ...knobs.map(([x, y]) => ({ d: circle(x, y, 2), cut: true })),
]
