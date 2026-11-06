import { rounded } from '../geometry'
import { knock, solid } from '../solid'

// 侧边栏：窗口 + 左侧竖线隔出侧栏
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius),
  'M9.5 4.5V19.5',
]

// 实心：窗口填实，竖线挖开，分出左侧栏
export const fill = ({ radius }) => [solid(rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius)), knock('M9.5 4.5V19.5')]
