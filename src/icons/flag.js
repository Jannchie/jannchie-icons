import { rounded } from '../geometry'

// 旗帜：旗杆 + 燕尾旗面
export default ({ radius }) => [
  'M5 21V3.5',
  rounded([[5, 4], [19, 4], [16, 8.5], [19, 13], [5, 13]], Math.min(radius, 1), false),
]
