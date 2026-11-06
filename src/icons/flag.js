import { rounded } from '../geometry'
import { solid } from '../solid'

// 旗帜：旗杆 + 燕尾旗面
export default ({ radius }) => [
  'M5.5 21V3.5',
  rounded([[5.5, 3.5], [19, 3.5], [16, 8], [19, 12.5], [5.5, 12.5]], Math.min(radius, 1), false),
]

// 实心：旗面一块，旗杆照旧是线
export const fill = ({ radius }) => [
  'M5.5 21V3.5',
  solid(rounded([[5.5, 3.5], [19, 3.5], [16, 8], [19, 12.5], [5.5, 12.5]], Math.min(radius, 1))),
]
