import { rounded } from '../geometry'

// 右侧边栏：窗口 + 右侧竖线（与 sidebar 镜像）
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius),
  'M14.5 4.5V19.5',
]
