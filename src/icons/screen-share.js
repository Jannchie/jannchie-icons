import { crisp, rounded } from '../geometry'
import { arrow } from '../media'
import { screen, stand } from '../monitor'

// 屏幕共享：显示器 + 屏幕里向上的箭头
export default ({ radius }) => [
  rounded(screen, Math.min(radius, 2.5)),
  ...stand,
  'M12 13V7.5',
  rounded(arrow(12, 7.5, 'up', 2.5), crisp(radius), false),
]
