import { rounded } from '../geometry'

// 手机：竖长机身 + 底部一道横线
export default ({ radius }) => [
  rounded([[6.5, 2.5], [17.5, 2.5], [17.5, 21.5], [6.5, 21.5]], Math.max(Math.min(radius, 3), 2)),
  'M10.5 18.5H13.5',
]
