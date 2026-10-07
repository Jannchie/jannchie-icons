import { circle } from '../geometry'

// 披萨（一块）：尖朝下的扇形 + 饼边线 + 三片香肠（半径 1，排在饼的上半宽处，彼此、和饼边都留得出缝）
export default ({ radius }) => [
  'M4 6.5C9.5 3.5 14.5 3.5 20 6.5L12 21Z',
  'M5.4 9C10 7 14 7 18.6 9',
  circle(10, 10.75, 1),
  circle(14, 10.75, 1),
  circle(12, 14.75, 1),
]
