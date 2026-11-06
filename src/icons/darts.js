import { circle } from '../geometry'
import { dot } from '../scene'
import { clear, knock, solid } from '../solid'

// 飞镖：靶（外圈 + 中圈 + 靶心）+ 从右上斜插进靶心的飞镖（镖杆 + 尾翼）
export default ({ radius }) => [
  { d: circle(11, 13, 8.5), cut: false },
  circle(11, 13, 4.5),
  dot(11, 13, 2.5),
  { d: 'M11 13L19.5 4.5', cut: true, gap: 0.5 },
  { d: 'M19.5 4.5L19.5 2.5', cut: true, gap: 0.5 },
  { d: 'M19.5 4.5L21.5 4.5', cut: true, gap: 0.5 },
]

// 实心：靶一块，挖掉中圈；飞镖四周让出 0.5 的缝（和描边版断开的间隙一样）再画回去，镖尖插在靶心
export const fill = () => {
  const dart = ['M11 13L19.5 4.5', 'M19.5 4.5L19.5 2.5', 'M19.5 4.5L21.5 4.5']
  return [solid(circle(11, 13, 8.5)), knock(circle(11, 13, 4.5)), clear(dart, 0.5), ...dart]
}
