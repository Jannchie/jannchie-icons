import { circle, crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { ring, square } from '../marks'

// 升级：圆圈 + 向上的箭头
export default ({ radius, stroke }) => [
  ring(),
  'M12 16.5V8',
  rounded(arrow(12, 8, 'up', 3), crisp(radius), false),
]
