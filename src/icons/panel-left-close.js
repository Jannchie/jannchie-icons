import { crisp, rounded } from '../geometry'

// 收起左侧栏：sidebar 的窗口 + 左侧竖线，主区里的小折角朝左（往侧栏方向收）；和 panel-left-open 同位置、方向相反
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius),
  'M9.5 4.5V19.5',
  rounded([[16.5, 9], [13.5, 12], [16.5, 15]], crisp(radius), false),
]
