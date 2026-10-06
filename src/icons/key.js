import { circle } from '../geometry'

// 钥匙：圆形钥匙头 + 45° 钥匙杆 + 两个齿
export default ({ radius }) => [
  circle(7.5, 16.5, 3.75),
  'M10.15 13.85L20 4',
  'M17.5 6.5L19.5 8.5',
  'M15 9L16.5 10.5',
]
