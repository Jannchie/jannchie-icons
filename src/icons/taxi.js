import { GAP } from '../clearance'
import { circle, rounded } from '../geometry'
import { clear, hole, solid } from '../solid'
import { shrink } from '../tag'

// 出租车：和 car 同一辆车（车身、腰线、窗柱、车轮），车顶中间多一块顶灯（10.5–14.5 × 3.5–6.5）
// 顶灯画成闭合的方块，底边和车顶重合：画成开口的折线时，两端的方头会从车顶下面冒出来
export default ({ radius }) => [
  rounded([[2.5, 14.5], [2.5, 10.5], [6, 10.5], [8.5, 6.5], [15, 6.5], [18, 10.5], [21.5, 10.5], [21.5, 14.5]], Math.min(radius, 1.5)),
  'M6 10.5H18',
  'M12.5 6.5V10.5',
  rounded([[10.5, 6.5], [10.5, 3.5], [14.5, 3.5], [14.5, 6.5]], Math.min(radius, 1)),
  circle(7, 16.75, 2.25),
  circle(17, 16.75, 2.25),
]

// 实心：车身连同顶灯一块，前后两扇车窗挖空（同 car）；车轮四周让出缝，车轮是实心圆
export const fill = ({ radius, stroke }) => {
  const k = Math.min(stroke, 1.6)
  const wheels = [circle(7, 16.75, 2.25), circle(17, 16.75, 2.25)]
  return [
    solid(rounded([[2.5, 14.5], [2.5, 10.5], [6, 10.5], [8.5, 6.5], [15, 6.5], [18, 10.5], [21.5, 10.5], [21.5, 14.5]], Math.min(radius, 1.5))),
    solid(rounded([[10.5, 6.5], [10.5, 3.5], [14.5, 3.5], [14.5, 6.5]], Math.min(radius, 1))),
    hole([rounded(shrink([[6, 10.5], [8.5, 6.5], [12.5, 6.5], [12.5, 10.5]], k), 0), rounded(shrink([[12.5, 6.5], [15, 6.5], [18, 10.5], [12.5, 10.5]], k), 0)]),
    clear(wheels, GAP),
    solid(wheels),
  ]
}
