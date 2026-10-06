import { circle } from '../geometry'

// 甜甜圈：外圆 + 中间的洞 + 四粒彩针（细节线宽）
export default ({ radius }) => [
  circle(12, 12, 9),
  circle(12, 12, 3),
  { d: 'M8 7.5L9 8.5', detail: true },
  { d: 'M15 6.5L16.5 7', detail: true },
  { d: 'M17.5 13L17 14.5', detail: true },
  { d: 'M7 14.5L8.5 15.5', detail: true },
]
