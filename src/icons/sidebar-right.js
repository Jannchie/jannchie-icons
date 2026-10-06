import { rounded } from '../geometry'

// 右侧边栏：窗口 + 右侧竖线（与 sidebar 镜像）
export default ({ radius }) => [
  rounded([[3, 4.5], [21, 4.5], [21, 19.5], [3, 19.5]], radius),
  'M15 4.5V19.5',
]
