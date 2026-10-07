import { ring } from '../marks'

// 圆圈 + 加号（加号落在 .5 上，往左上偏半格）
export default ({ radius }) => [
  ring(),
  'M11.5 7.5V15.5',
  'M7.5 11.5H15.5',
]
