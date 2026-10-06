import { ring } from '../marks'
import { crisp, rounded } from '../geometry'

// Xbox Share 键：圆圈 + 开口朝上的小框 + 向上的箭头
export default ({ radius }) => [
  ring(),
  rounded([[9.75, 11], [8, 11], [8, 16], [16, 16], [16, 11], [14.25, 11]], Math.min(radius, 0.75), false),
  'M12 13.5V7.5',
  rounded([[10, 9.5], [12, 7.5], [14, 9.5]], crisp(radius), false),
]
