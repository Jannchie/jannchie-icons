import { ring } from '../marks'

// 和平标志：圆环 + 竖线 + 从中心往左下、右下的两道
export default ({ radius }) => [
  ring(),
  'M12 3V21',
  'M12 12L5.64 18.36',
  'M12 12L18.36 18.36',
]
