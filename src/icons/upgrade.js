import { circle, crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { ring, square } from '../marks'

// 升级：圆圈 + 向上的箭头（竖线落在 .5 上，偏左半格）
export default ({ radius, stroke }) => [
  ring(),
  'M11.5 16.5V8',
  rounded(arrow(11.5, 8, 'up', 3), crisp(radius), false),
]
