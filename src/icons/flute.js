import { rounded } from '../geometry'
import { rotate } from '../transform'

// 长笛：笛管（宽 4）+ 左端吹孔 + 一排小按孔（直径 1.5）；横着画再顺时针转 45°（\ 方向）——管窄了按孔会粘在管壁上
export default ({ radius }) => [
  rotate(rounded([[2.5, 10], [21.5, 10], [21.5, 14], [2.5, 14]], Math.min(radius, 2)), 45),
  { d: rotate('M5.5 12h0', 45), dot: 1.5 },
  { d: rotate('M10 12h0', 45), dot: 1.5 },
  { d: rotate('M12.75 12h0', 45), dot: 1.5 },
  { d: rotate('M15.5 12h0', 45), dot: 1.5 },
  { d: rotate('M18.25 12h0', 45), dot: 1.5 },
]
