import { circle } from '../geometry'

// 调节：三道横线，各有一个圆形滑块；滑块作为 cut，横线在滑块处真正断开
// 三道横线落在 .5 上，整体比居中高半格
const knobs = [[15, 5.5], [8, 11.5], [13, 17.5]]

export default () => [
  ...knobs.map(([, y]) => `M3 ${y}H21`),
  ...knobs.map(([x, y]) => ({ d: circle(x, y, 2), cut: true })),
]
