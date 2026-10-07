import { rounded } from '../geometry'

// 图钉：顶帽 + 收窄后张开的针座 + 针；针落在 .5 上，整体偏左半格
export default ({ radius }) => [
  'M8 3.5H15',
  rounded([[9.5, 3.5], [9.5, 9], [6, 13.5], [17, 13.5], [13.5, 9], [13.5, 3.5]], Math.min(radius, 1), false),
  'M11.5 13.5V21',
]
