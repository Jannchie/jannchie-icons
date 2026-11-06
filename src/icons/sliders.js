import { GAP } from '../clearance'
import { circle } from '../geometry'
import { clear, solid } from '../solid'

// 调节：三道横线，各有一个圆形滑块；滑块作为 cut，横线在滑块处真正断开
// 三道横线以 y=12 为中心上下等距
const knobs = [[15, 6], [8, 12], [13, 18]]

export default () => [
  ...knobs.map(([, y]) => `M3 ${y}H21`),
  ...knobs.map(([x, y]) => ({ d: circle(x, y, 2), cut: true })),
]

// 实心：横线照旧，在滑块四周让出缝（和描边版的断口一样），滑块填实
export const fill = () => {
  const circles = knobs.map(([x, y]) => circle(x, y, 2))
  return [...knobs.map(([, y]) => `M3 ${y}H21`), clear(circles, GAP), solid(circles)]
}
