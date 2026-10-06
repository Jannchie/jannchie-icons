import { rounded } from '../geometry'
import { rotate } from '../transform'

// 长笛：细长的笛管 + 左端吹孔 + 一排按孔；横着画再顺时针转 45°（\ 方向）
export default ({ radius }) => [
  rotate(rounded([[2.5, 10.75], [21.5, 10.75], [21.5, 13.25], [2.5, 13.25]], Math.min(radius, 1.25)), 45),
  rotate('M5.5 12h0', 45),
  rotate('M10 12h0', 45),
  rotate('M12.75 12h0', 45),
  rotate('M15.5 12h0', 45),
  rotate('M18.25 12h0', 45),
]
