import { rounded } from '../geometry'

// 表格：外框 + 表头横线、中间横线 + 左列竖线
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius),
  'M3.5 9.5H20.5',
  'M3.5 14.5H20.5',
  'M9.5 4.5V19.5',
]
