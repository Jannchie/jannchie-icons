import { rounded } from '../geometry'

// 网格加一格：三个方块，右下角的格子换成加号（添加应用、组件）
const cell = (x, y, radius) => rounded([[x, y], [x + 7, y], [x + 7, y + 7], [x, y + 7]], Math.min(radius, 1.5))

export default ({ radius }) => [
  cell(3.5, 3.5, radius),
  cell(13.5, 3.5, radius),
  cell(3.5, 13.5, radius),
  'M17 13.5V20.5M13.5 17H20.5',
]
