import { rounded } from '../geometry'

// 图钉：顶帽 + 收窄后张开的针座 + 针
export default ({ radius }) => [
  'M8.5 3.5H15.5',
  rounded([[10, 3.5], [10, 9], [6.5, 13.5], [17.5, 13.5], [14, 9], [14, 3.5]], Math.min(radius, 1), false),
  'M12 13.5V21',
]
