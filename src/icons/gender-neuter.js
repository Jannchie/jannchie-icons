import { circle } from '../geometry'

// 无性别：圆 + 下方竖线（整体右移半格）
export default ({ radius }) => [
  circle(12.5, 9, 5.5),
  'M12.5 14.5V21.5',
]
