import { rounded } from '../geometry'

// 九宫格：外框 + 两横两竖；外框 3–21（边长 18、每格 6），居中
export default ({ radius }) => [
  rounded([[3, 3], [21, 3], [21, 21], [3, 21]], Math.min(radius, 2.5)),
  'M9 3V21',
  'M15 3V21',
  'M3 9H21',
  'M3 15H21',
]
