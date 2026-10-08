import { rounded } from '../geometry'
import { dot } from '../scene'

// 二维码：三个角上的定位方框（外框 + 中心点）+ 右下区域 2×2 的数据点
// 定位框墨迹 2.75–11.25 / 12.75–21.25，四个数据点的墨迹也正好铺满 12.75–21.25，整体居中
const finder = (x, y, radius) => [rounded([[x, y], [x + 7, y], [x + 7, y + 7], [x, y + 7]], Math.min(radius, 1.5)), dot(x + 3.5, y + 3.5, 2.5)]
export default ({ radius }) => [
  ...finder(3.5, 3.5, radius),
  ...finder(13.5, 3.5, radius),
  ...finder(3.5, 13.5, radius),
  ...[[14.25, 14.25], [19.75, 14.25], [14.25, 19.75], [19.75, 19.75]].map(([x, y]) => dot(x, y, 3)),
]
