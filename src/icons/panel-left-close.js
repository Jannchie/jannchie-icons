import { crisp, rounded } from '../geometry'
import { knock, solid } from '../solid'

// 收起左侧栏：sidebar 的窗口 + 左侧竖线，主区里的小折角朝左（往侧栏方向收）；和 panel-left-open 同位置、方向相反
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius),
  'M9.5 4.5V19.5',
  rounded([[16.5, 9], [13.5, 12], [16.5, 15]], crisp(radius), false),
]

// 实心：窗口填实，侧栏竖线挖开，主区挖掉小折角
export const fill = ({ radius }) => [
  solid(rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius)),
  knock(['M9.5 4.5V19.5', rounded([[16.5, 9], [13.5, 12], [16.5, 15]], crisp(radius), false)]),
]
