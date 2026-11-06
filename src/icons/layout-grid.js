import { rounded } from '../geometry'
import { solid } from '../solid'

// 网格：2×2 四个方块
const cell = (x, y, radius) => rounded([[x, y], [x + 7, y], [x + 7, y + 7], [x, y + 7]], Math.min(radius, 1.5))

export default ({ radius }) => [
  cell(3.5, 3.5, radius),
  cell(13.5, 3.5, radius),
  cell(3.5, 13.5, radius),
  cell(13.5, 13.5, radius),
]

// 实心：四个方块都填实
export const fill = ({ radius }) => [
  solid([cell(3.5, 3.5, radius), cell(13.5, 3.5, radius), cell(3.5, 13.5, radius), cell(13.5, 13.5, radius)]),
]
