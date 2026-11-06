import { circle } from '../geometry'
import { hole, knock, solid } from '../solid'

// 甜甜圈：外圆 + 中间的洞 + 四粒彩针（细节线宽）
export default ({ radius }) => [
  circle(12, 12, 9),
  circle(12, 12, 3),
  { d: 'M8 7.5L9 8.5', detail: true },
  { d: 'M15 6.5L16.5 7', detail: true },
  { d: 'M17.5 13L17 14.5', detail: true },
  { d: 'M7 14.5L8.5 15.5', detail: true },
]

// 实心：外圆一块，中间挖一个圆洞（外扩半个线宽后和描边版内圆的中心线一样大），彩针挖空
export const fill = ({ stroke }) => [
  solid(circle(12, 12, 9)),
  hole(circle(12, 12, 3 - stroke / 2)),
  knock([
    { d: 'M8 7.5L9 8.5', detail: true },
    { d: 'M15 6.5L16.5 7', detail: true },
    { d: 'M17.5 13L17 14.5', detail: true },
    { d: 'M7 14.5L8.5 15.5', detail: true },
  ]),
]
