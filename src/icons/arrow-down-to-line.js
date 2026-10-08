import { circle, crisp, rounded } from '../geometry'
import { arrow } from '../media'

// 回到底部：底部横线 + 向下的箭头
export default ({ radius, stroke }) => [
  'M5 20.5H19',
  'M12 3.5V16',
  rounded(arrow(12, 16, 'down', 3.5), crisp(radius), false),
]
