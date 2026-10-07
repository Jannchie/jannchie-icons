import { ring } from '../marks'
import { crisp, rounded } from '../geometry'

// Xbox Share 键：圆圈 + 开口朝上的小框 + 向上的箭头（竖线落在 11.5，整组左移半格；小框下移半格）
export default ({ radius }) => [
  ring(),
  rounded([[9.25, 11.5], [7.5, 11.5], [7.5, 16.5], [15.5, 16.5], [15.5, 11.5], [13.75, 11.5]], Math.min(radius, 0.75), false),
  'M11.5 14V7.5',
  rounded([[9.5, 9.5], [11.5, 7.5], [13.5, 9.5]], crisp(radius), false),
]
