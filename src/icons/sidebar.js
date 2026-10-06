import { rounded } from '../geometry'

// 侧边栏：窗口 + 左侧竖线隔出侧栏
export default ({ radius }) => [
  rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], radius),
  'M9 4.5V19.5',
]
