import { GAP } from '../clearance'
import { rounded } from '../geometry'
import { dot, GROUND, groundLine, opening } from '../scene'
import { hole, knock, solid } from '../solid'

// 警察局：平顶楼，楼顶一盏警灯向两侧放光；光线只用横线和斜线，正中不放竖线（落不到 .5 上）
const wall = [[4.5, GROUND], [4.5, 10.5], [19.5, 10.5], [19.5, GROUND]]
const rays = ['M5.5 8.5H7.5', 'M16.5 8.5H18.5', 'M6.5 4.5L8 6', 'M17.5 4.5L16 6']
const windows = [dot(8, 14.5), dot(16, 14.5)]

export default ({ radius }) => [
  groundLine,
  rounded(wall, radius, false),
  'M9.5 10.5V8.5A2.5 2.5 0 0 1 14.5 8.5V10.5',
  ...rays,
  ...windows,
  rounded(opening(12, 3, 5.5), radius, false),
]

// 实心：楼身一块，两扇窗挖成圆点（尖角模式下也是圆的），门挖空；警灯单独一块，底边往上收成圆顶上的一段弓形，和楼顶之间留 GAP 的缝；
// 光线和地平线照旧是线
export const fill = ({ radius, stroke }) => {
  const h = stroke / 2
  const y = Math.min(10.5 - stroke - GAP, 8.5)
  const w = Math.sqrt(2.5 ** 2 - (8.5 - y) ** 2)
  return [
    solid(`${rounded(wall, radius, false)}Z`),
    knock(windows.map(w => ({ ...w, round: true }))),
    hole(rounded(opening(12, 3 - stroke, 5.5 - h), Math.max(0, radius - h), false)),
    solid(`M${12 - w} ${y}A2.5 2.5 0 0 1 ${12 + w} ${y}Z`),
    ...rays,
    groundLine,
  ]
}
