import { circle, crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 回到顶部：顶部横线 + 向上的箭头
export default ({ radius, stroke }) => [
  'M5 4H19',
  'M12 20.5V8',
  rounded(arrow(12, 8, 'up', 3.5), crisp(radius), false),
]
