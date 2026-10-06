import { rounded } from '../geometry'
import { dot } from '../scene'

// 二维码：三个角上的定位方框（外框 + 中心点）+ 右下区域的数据点
const finder = (x, y, radius) => [rounded([[x, y], [x + 7, y], [x + 7, y + 7], [x, y + 7]], Math.min(radius, 1.5)), dot(x + 3.5, y + 3.5, 2.5)]
export default ({ radius }) => [
  ...finder(3, 3, radius),
  ...finder(14, 3, radius),
  ...finder(3, 14, radius),
  ...[[14.5, 14.5], [17.5, 14.5], [20.5, 14.5], [14.5, 17.5], [20.5, 17.5], [14.5, 20.5], [17.5, 20.5], [20.5, 20.5], [17.5, 17.5]].map(([x, y]) => dot(x, y, 2)),
]
