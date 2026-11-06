import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 右侧边栏：窗口 + 右侧竖线（与 sidebar 镜像）
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius),
  'M14.5 4.5V19.5',
]

// 实心：窗口填实，竖线挖开，分出右侧栏
export const fill = ({ radius }) => [solid(rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius)), knock('M14.5 4.5V19.5')]
