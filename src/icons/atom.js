import { rotate } from '../transform'
import { dot } from '../scene'

// 原子：三条互成 60° 的椭圆轨道 + 中心的原子核
const orbit = 'M3 12A9 3.5 0 1 0 21 12A9 3.5 0 1 0 3 12Z'
export default () => [
  orbit,
  rotate(orbit, 60),
  rotate(orbit, 120),
  dot(12, 12, 3),
]
