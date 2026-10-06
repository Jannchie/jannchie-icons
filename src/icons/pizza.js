import { circle } from '../geometry'

// 披萨（一块）：尖朝下的扇形 + 饼边线 + 三片香肠
export default ({ radius }) => [
  'M4 6.5C9.5 3.5 14.5 3.5 20 6.5L12 21Z',
  'M5.4 9C10 7 14 7 18.6 9',
  circle(10, 11.5, 1.5),
  circle(14.25, 12.5, 1.25),
  circle(12, 16, 1.1),
]
