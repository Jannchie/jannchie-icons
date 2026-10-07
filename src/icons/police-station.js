import { rounded } from '../geometry'
import { dot, GROUND, groundLine, opening } from '../scene'

// 警察局：平顶楼，楼顶一盏警灯向两侧放光；光线只用横线和斜线，正中不放竖线（落不到 .5 上）
export default ({ radius }) => [
  groundLine,
  rounded([[4.5, GROUND], [4.5, 10.5], [19.5, 10.5], [19.5, GROUND]], radius, false),
  'M9.5 10.5V8.5A2.5 2.5 0 0 1 14.5 8.5V10.5',
  'M5.5 8.5H7.5',
  'M16.5 8.5H18.5',
  'M6.5 4.5L8 6',
  'M17.5 4.5L16 6',
  dot(8, 14.5),
  dot(16, 14.5),
  rounded(opening(12, 3, 5.5), radius, false),
]
