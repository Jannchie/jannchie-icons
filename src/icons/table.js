import { rounded } from '../geometry'

// 表格：外框 + 表头横线、中间横线 + 左列竖线
export default ({ radius }) => [
  rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], radius),
  'M3 9.5H21',
  'M3 14.5H21',
  'M9 4.5V19.5',
]
