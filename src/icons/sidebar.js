import { rounded } from '../geometry'

// 侧边栏：窗口 + 左侧竖线隔出侧栏
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius),
  'M9.5 4.5V19.5',
]
