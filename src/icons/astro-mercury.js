import { circle } from '../geometry'

// 水星 ☿：顶上一对朝上的角 + 圆 + 下方的十字
// 整体左移半格，竖笔落在 11.5
export default ({ radius }) => [
  'M8 2.5A4 4 0 0 0 15 2.5',
  circle(11.5, 9.75, 3.75),
  'M11.5 13.5V21',
  'M8.5 17.5H14.5',
]
