import { circle } from '../geometry'

// 无性别：圆 + 下方竖线
export default ({ radius }) => [
  circle(12, 9, 5.5),
  'M12 14.5V21.5',
]
