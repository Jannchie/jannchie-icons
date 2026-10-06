import { circle, rounded } from '../geometry'
import { dot } from '../scene'

// 四子棋：竖立的棋盘框 + 底座支脚 + 2 行 3 列的大圆孔，其中三个是落下的实心棋子
export default ({ radius }) => [
  rounded([[3.5, 4], [20.5, 4], [20.5, 17.5], [3.5, 17.5]], Math.min(radius, 2)),
  'M5.5 17.5L4 21',
  'M18.5 17.5L20 21',
  circle(7.5, 8.25, 2),
  circle(12, 8.25, 2),
  dot(16.5, 8.25, 4),
  dot(7.5, 13.25, 4),
  dot(12, 13.25, 4),
  circle(16.5, 13.25, 2),
]
