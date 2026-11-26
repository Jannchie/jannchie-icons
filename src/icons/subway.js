import { rounded } from '../geometry'
import { dot } from '../scene'
import { hole, knock, solid } from '../solid'
import { shrink } from '../tag'

// 地铁（正视）：一道隧道拱（半径 8.5、圆心 (12, 11.5)，两条拱脚落到 21）里开出来一节车头
// 车头 7.5–16.5 × 7.5–18.5，一道横线（12.5）隔出上面的大挡风窗，下面两颗车灯点；车底两条往外撇的短线是铁轨
// 和 train（侧视高铁）区分靠正面视角，和普通火车车头区分靠外面那道隧道拱（地下）
const tunnel = 'M3.5 21V11.5A8.5 8.5 0 0 1 20.5 11.5V21'
const car = radius => rounded([[7.5, 7.5], [16.5, 7.5], [16.5, 18.5], [7.5, 18.5]], Math.min(radius, 2))
const lights = [dot(10, 16), dot(14, 16)]
const rails = 'M9.5 18.5L8.5 21M14.5 18.5L15.5 21'

export default ({ radius }) => [tunnel, car(radius), 'M7.5 12.5H16.5', ...lights, rails]

// 实心：车头一块，挡风窗挖空（和描边版窗框的内缘一样大），车灯挖成小孔；隧道拱、铁轨照旧是线
export const fill = ({ radius, stroke }) => {
  const k = Math.min(stroke, 2.4)
  const r = Math.max(0, Math.min(radius, 2) - stroke) / 2
  return [
    tunnel,
    solid(car(radius)),
    hole(rounded(shrink([[7.5, 7.5], [16.5, 7.5], [16.5, 12.5], [7.5, 12.5]], k), r)),
    knock(lights),
    rails,
  ]
}
