import { circle } from '../geometry'

// 水星 ☿：顶上一对朝上的角 + 圆 + 下方的十字
export default ({ radius }) => [
  'M8.5 2.5A4 4 0 0 0 15.5 2.5',
  circle(12, 9.75, 3.75),
  'M12 13.5V21',
  'M9 17.5H15',
]
