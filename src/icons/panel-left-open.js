import { crisp, rounded } from '../geometry'

// 展开左侧栏：和 sidebar 同一个窗口 + 左侧竖线（9.5），右边主区（9.5–20.5，中心 15）里一个朝右的小折角（深 3、高 6），指向侧栏要展开的方向
export default ({ radius }) => [
  rounded([[3.5, 4.5], [20.5, 4.5], [20.5, 19.5], [3.5, 19.5]], radius),
  'M9.5 4.5V19.5',
  rounded([[13.5, 9], [16.5, 12], [13.5, 15]], crisp(radius), false),
]
