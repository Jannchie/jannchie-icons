import { crisp, rounded } from '../geometry'

// 收起右侧栏：sidebar-right 的窗口 + 右侧竖线，主区里的小折角朝右（往侧栏方向收）；panel-left-close 的镜像
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius),
  'M14.5 4.5V19.5',
  rounded([[7.5, 9], [10.5, 12], [7.5, 15]], crisp(radius), false),
]
