import { circle } from '../geometry'
import { hole, solid } from '../solid'

// 钥匙：圆形钥匙头 + 45° 钥匙杆 + 两个齿
export default ({ radius }) => [
  circle(7.5, 16.5, 3.75),
  'M10.15 13.85L20 4',
  'M17.5 6.5L19.5 8.5',
  'M15 9L16.5 10.5',
]

// 实心：钥匙头填实，正中挖一个小孔（穿钥匙圈的孔）；杆和齿照旧是线
export const fill = ({ stroke }) => [
  solid(circle(7.5, 16.5, 3.75)),
  hole(circle(7.5, 16.5, 1.5 - stroke / 2)),
  'M10.15 13.85L20 4',
  'M17.5 6.5L19.5 8.5',
  'M15 9L16.5 10.5',
]
