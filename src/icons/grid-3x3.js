import { rounded } from '../geometry'

// 九宫格：外框 + 两横两竖；三格等宽又要都落在 .5 上，外框 3.5–21.5（边长 18、每格 6），整体往右下挪半格（同 layout-columns）
export default ({ radius }) => [
  rounded([[3.5, 3.5], [21.5, 3.5], [21.5, 21.5], [3.5, 21.5]], Math.min(radius, 2.5)),
  'M9.5 3.5V21.5',
  'M15.5 3.5V21.5',
  'M3.5 9.5H21.5',
  'M3.5 15.5H21.5',
]
