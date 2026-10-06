import { rounded } from '../geometry'

// HDMI 接口：下方两角斜切的梯形外壳 + 中间的触点条
export default ({ radius }) => [
  rounded([[3, 8.5], [21, 8.5], [21, 13], [18.5, 15.5], [5.5, 15.5], [3, 13]], Math.min(radius, 1)),
  'M7 12H17',
]
