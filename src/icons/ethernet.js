import { rounded } from '../geometry'

// 网口（RJ45）：带下方卡扣凸起的方口 + 顶部四根针脚
export default ({ radius }) => [
  rounded([[4, 5], [20, 5], [20, 16], [16, 16], [16, 19], [8, 19], [8, 16], [4, 16]], Math.min(radius, 1.5)),
  'M8.5 8V10.5',
  'M10.83 8V10.5',
  'M13.17 8V10.5',
  'M15.5 8V10.5',
]
