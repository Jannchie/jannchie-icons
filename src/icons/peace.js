import { ring } from '../marks'

// 和平标志：圆环 + 竖线 + 从中心往左下、右下的两道；竖线落在 .5 上，偏左半格
export default ({ radius }) => [
  ring(),
  'M11.5 3V21',
  'M11.5 12L5.64 18.36',
  'M11.5 12L18.36 18.36',
]
