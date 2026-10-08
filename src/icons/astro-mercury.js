import { circle } from '../geometry'

// 水星 ☿：顶上一对朝上的角（弧压平到半径 4.5）+ 圆（半径 3.5）+ 下方的十字；角和圆之间留得出缝
export default ({ radius }) => [
  'M8.5 2.5A4.5 4.5 0 0 0 15.5 2.5',
  circle(12, 10, 3.5),
  'M12 13.5V21',
  'M9 17.5H15',
]
