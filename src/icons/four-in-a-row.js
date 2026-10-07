import { circle, rounded } from '../geometry'

// 四子棋：竖立的棋盘框 + 底座支脚 + 2 行 3 列的圆孔（半径 1.25，圆心间隔 5：粗字重下相邻棋子之间还留 0.5），其中三个是落下的实心棋子；
// 棋子是填实的同一个圆（不用点：点的大小随字重另算，和空孔对不齐）
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 17.5], [3.5, 17.5]], Math.min(radius, 2)),
  'M5.5 17.5L4 21',
  'M18.5 17.5L20 21',
  circle(7, 8.5, 1.25),
  circle(12, 8.5, 1.25),
  { d: circle(17, 8.5, 1.25), fill: true },
  { d: circle(7, 13.5, 1.25), fill: true },
  { d: circle(12, 13.5, 1.25), fill: true },
  circle(17, 13.5, 1.25),
]
