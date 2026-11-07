import { circle } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 实况照片：中心圆 + 中圈 + 外圈一圈点
export default () => [
  circle(12, 12, 2.5),
  circle(12, 12, 5.5),
  ...Array.from({ length: 16 }, (_, i) => dot(12 + 9 * Math.cos(i * Math.PI / 8), 12 + 9 * Math.sin(i * Math.PI / 8), 1.5)),
]

// 实心：中圈填实，挖掉中心圆的圆圈（中心留成实心圆），外圈的点照旧、尖角模式下也是圆点（方点排成一圈像齿轮）
export const fill = () => [
  solid(circle(12, 12, 5.5)),
  knock(circle(12, 12, 2.5)),
  ...Array.from({ length: 16 }, (_, i) => ({ ...dot(12 + 9 * Math.cos(i * Math.PI / 8), 12 + 9 * Math.sin(i * Math.PI / 8), 1.5), round: true })),
]
