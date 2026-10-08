import { crisp, rounded } from '../geometry'

// 展开右侧栏：和 sidebar-right 同一个窗口 + 右侧竖线（14.5），左边主区（3.5–14.5，中心 9）里一个朝左的小折角，指向右侧栏展开的方向；panel-left-open 的镜像
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius),
  'M14.5 4.5V19.5',
  rounded([[10.5, 9], [7.5, 12], [10.5, 15]], crisp(radius), false),
]
