import { circle, crisp, rounded } from '../geometry'
import { dot } from '../scene'
import { knock, solid } from '../solid'

// 雷达：外圈 + 内圈 + 扫描线 + 两个光点
export default ({ radius, stroke }) => [
  circle(12, 12, 9),
  circle(12, 12, 5),
  'M12 12L18.36 5.64',
  dot(8, 9),
  dot(15.5, 15),
]

// 实心：外圈一块，挖掉内圈、扫描线和两个光点；扫描线在离外缘一个线宽处停下，不把圆片切开
export const fill = ({ stroke }) => {
  const e = 12 + (9 - stroke) * Math.SQRT1_2
  return [
    solid(circle(12, 12, 9)),
    knock([circle(12, 12, 5), `M12 12L${e} ${24 - e}`, dot(8, 9), dot(15.5, 15)]),
  ]
}
