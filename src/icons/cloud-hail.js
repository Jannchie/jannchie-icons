import { circle } from '../geometry'
import { cloud } from '../symbols'

// 冰雹：云 + 三颗小圆圈
export default () => [
  ...cloud([12, 9.5], 2.2),
  circle(8, 18.5, 1),
  circle(12, 20, 1),
  circle(16, 18.5, 1),
]
