import { ring } from '../marks'

// Xbox Menu 键：圆圈 + 三道横线（落在 .5 上，整组上移半格）
export default ({ radius }) => [
  ring(),
  'M8 8.5H16',
  'M8 11.5H16',
  'M8 14.5H16',
]
