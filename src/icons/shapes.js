import { circle, rounded } from '../geometry'

// 图形：金字塔构图，上方等边三角（斜边与竖直成 30°），左下方块，右下圆；外框 3.5–20.5
// 三角高取 7：底边落在 10.5（.5 上），边长约 8.08
const h = 7
const tri = h * 2 / Math.sqrt(3)

export default ({ radius }) => [
  rounded([[12, 3.5], [12 + tri / 2, 3.5 + h], [12 - tri / 2, 3.5 + h]], Math.min(radius, 1)),
  rounded([[3.5, 12.5], [11.5, 12.5], [11.5, 20.5], [3.5, 20.5]], Math.min(radius, 2)),
  circle(16.5, 16.5, 4),
]
