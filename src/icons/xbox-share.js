import { ring } from '../marks'
import { crisp, rounded } from '../geometry'

// Xbox Share 键：圆圈 + 开口朝上的小框 + 向上的箭头（竖线落在中轴 x=12 上，整组上下居中）
export default ({ radius }) => [
  ring(),
  rounded([[9.75, 11.5], [8, 11.5], [8, 16.5], [16, 16.5], [16, 11.5], [14.25, 11.5]], Math.min(radius, 0.75), false),
  'M12 14V7.5',
  rounded([[10, 9.5], [12, 7.5], [14, 9.5]], crisp(radius), false),
]
