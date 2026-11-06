import { circle } from '../geometry'
import { solid } from '../solid'
import { cloud } from '../symbols'

// 冰雹：云 + 三颗小圆圈
export default () => [
  ...cloud([12, 9.5], 2.2),
  circle(8, 18.5, 1),
  circle(12, 20, 1),
  circle(16, 18.5, 1),
]

// 实心：云一块，三颗冰雹也填实
export const fill = () => [
  ...solid(cloud([12, 9.5], 2.2)),
  solid([circle(8, 18.5, 1), circle(12, 20, 1), circle(16, 18.5, 1)]),
]
