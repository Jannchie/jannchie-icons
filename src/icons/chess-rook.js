import { base } from '../chess'
import { crisp, rounded } from '../geometry'

// 国际象棋·车：顶部三个城垛 + 往下微收的塔身 + 底座
export default ({ radius }) => [
  rounded([[7.5, 8], [7.5, 4], [9.5, 4], [9.5, 5.75], [11, 5.75], [11, 4], [13, 4], [13, 5.75], [14.5, 5.75], [14.5, 4], [16.5, 4], [16.5, 8]], crisp(radius)),
  'M7.5 8H16.5',
  'M8.5 8L9.5 17.5',
  'M15.5 8L14.5 17.5',
  base(radius),
]
