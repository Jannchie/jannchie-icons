import { circle, rounded } from '../geometry'

// 拨动开关（关）：胶囊形底座（2.5–21.5 × 6.5–17.5）+ 靠左的空心旋钮（半径 2.5：空心圈比实心球看着大，缩一点和底座留开）
export default ({ radius }) => [
  rounded([[2.5, 6.5], [21.5, 6.5], [21.5, 17.5], [2.5, 17.5]], Math.min(Math.max(radius, 0) * 2.75, 5.5)),
  circle(8, 12, 2.5),
]
