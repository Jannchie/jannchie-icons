import { ring } from '../marks'

// Xbox Menu 键：圆圈 + 三道横线（以圆心为中，间距 3）
export default ({ radius }) => [
  ring(),
  'M8 9H16',
  'M8 12H16',
  'M8 15H16',
]
