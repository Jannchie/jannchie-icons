import { circle } from '../geometry'

// 位置：水滴形定位针 + 中心圆
export default ({ radius }) => [
  'M12 21.5C12 21.5 5 15 5 9.5A7 7 0 0 1 19 9.5C19 15 12 21.5 12 21.5Z',
  circle(12, 9.5, 2.5),
]
