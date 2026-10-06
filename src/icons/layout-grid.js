import { rounded } from '../geometry'

// 网格：2×2 四个方块
const cell = (x, y, radius) => rounded([[x, y], [x + 7, y], [x + 7, y + 7], [x, y + 7]], Math.min(radius, 1.5))

export default ({ radius }) => [
  cell(3.5, 3.5, radius),
  cell(13.5, 3.5, radius),
  cell(3.5, 13.5, radius),
  cell(13.5, 13.5, radius),
]
