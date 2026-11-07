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

// 实心：云一块，三颗冰雹也填实；粗字重下冰雹收小一点，和云底（15.5）之间留 0.5 的缝，不贴上
export const fill = ({ stroke }) => {
  const r = Math.min(1, 2.5 - stroke)
  return [
    ...solid(cloud([12, 9.5], 2.2)),
    solid([circle(8, 18.5, r), circle(12, 20, r), circle(16, 18.5, r)]),
  ]
}
