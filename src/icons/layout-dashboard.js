import { rounded } from '../geometry'

// 仪表盘布局：两列四块，和 layout-grid 同样的列（3.5–10.5 / 13.5–20.5）、块间隔 3；
// 左列上高下矮（9 / 5）、右列上矮下高（5 / 9），错开的高低块就是仪表盘的样子
const cell = (x, y, h, radius) => rounded([[x, y], [x + 7, y], [x + 7, y + h], [x, y + h]], Math.min(radius, 1.5))

export default ({ radius }) => [
  cell(3.5, 3.5, 9, radius),
  cell(3.5, 15.5, 5, radius),
  cell(13.5, 3.5, 5, radius),
  cell(13.5, 11.5, 9, radius),
]
