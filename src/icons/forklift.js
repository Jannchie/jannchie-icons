import { GAP } from '../clearance'
import { circle, rounded } from '../geometry'
import { clear, solid } from '../solid'

// 叉车（侧视、朝右）：底盘 3.5–14.5 × 11.5–16.5，上面一个开口的护顶架（后柱 5.5、顶 4.5、前柱斜到底盘 13.5）；
// 车头立着门架（14.5，从底盘底边一直升到 3.5）——门架就是底盘前缘往上接出去的那根立柱，货叉沿着它升降，不能和车身分开画；
// 门架上横伸出去的货叉（14.5 高）托着一个货箱（16.5–20.5 × 9.5–14.5，货叉接在货箱底边的左端）；
// 底盘下两个车轮（半径 2，圆心 6 / 12，顶在底边上）
// 贴着车头的门架 + 货叉 + 抬起的货箱是记号；货箱离门架 2，粗字重下也不粘
const chassis = radius => rounded([[3.5, 16.5], [3.5, 11.5], [14.5, 11.5, 0], [14.5, 16.5]], Math.min(radius, 1.5))
const guard = radius => rounded([[5.5, 11.5], [5.5, 4.5], [11.5, 4.5], [13.5, 11.5]], Math.min(radius, 1), false)
const mast = 'M14.5 11.5V3.5'
const fork = 'M14.5 14.5H16.5'
const crate = radius => rounded([[16.5, 14.5], [16.5, 9.5], [20.5, 9.5], [20.5, 14.5]], Math.min(radius, 1))
const wheels = [circle(6, 18.5, 2), circle(12, 18.5, 2)]

export default ({ radius }) => [chassis(radius), guard(radius), mast, fork, crate(radius), ...wheels]

// 实心：底盘、货箱各一块；车轮四周让出缝，车轮是实心圆；护顶架、门架、货叉照旧是线
export const fill = ({ radius }) => [
  solid(chassis(radius)),
  guard(radius),
  clear(wheels, GAP),
  solid(wheels),
  solid(crate(radius)),
  mast,
  fork,
]
