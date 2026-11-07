import { rounded } from '../geometry'
import { GROUND, groundLine, opening } from '../scene'
import { hole, knock, solid } from '../solid'

// 医院：平顶，正中十字
const cross = [12, 10.5]
const body = [[5, GROUND, 0], [5, 5.5], [19, 5.5], [19, GROUND, 0]]
const plus = [
  `M${cross[0]} ${cross[1] - 2}V${cross[1] + 2}`,
  `M${cross[0] - 2} ${cross[1]}H${cross[0] + 2}`,
]

export default ({ radius }) => [
  groundLine,
  rounded(body, radius, false),
  ...plus,
  rounded(opening(12, 4, 5.5), radius, false),
]

// 实心：楼身一块（底下两个角贴着地平线，不收圆角），十字挖空，门挖空；地平线最后画
export const fill = ({ radius, stroke }) => [
  solid(rounded(body, radius)),
  knock(plus),
  hole(rounded(opening(12, 4 - stroke, 5.5 - stroke / 2), Math.max(0, radius - stroke / 2), false)),
  groundLine,
]
