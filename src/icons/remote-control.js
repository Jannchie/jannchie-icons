import { circle, rounded } from '../geometry'
import { dot, eye } from '../scene'
import { knock, solid } from '../solid'

// 遥控器：竖放的小机身（8.5–15.5 × 9.5–21.5）+ 面板上一个圆按钮和两个小点按钮；顶上两道同心信号弧（圆心在机身顶边正中，左右各张开 45°，同 wifi）
const [cx, cy] = [12, 9.5]
const body = radius => rounded([[8.5, 9.5], [15.5, 9.5], [15.5, 21.5], [8.5, 21.5]], Math.min(radius, 2))
const arc = (r) => {
  const d = +(r * Math.SQRT1_2).toFixed(3)
  return `M${cx - d} ${cy - d}A${r} ${r} 0 0 1 ${cx + d} ${cy - d}`
}
const waves = [arc(3.5), arc(7)]

export default ({ radius }) => [
  body(radius),
  ...waves,
  { d: circle(12, 13.5, 1.25), detail: true },
  dot(10.75, 18, 1.5),
  dot(13.25, 18, 1.5),
]

// 实心：机身一块，圆按钮挖成一个洞、两个小点挖空（用 eye：尖角模式下也是圆点，粗字重下不再变大）；信号弧照旧是线
export const fill = ({ radius }) => [
  solid(body(radius)),
  knock([eye(12, 13.5, 3.25), eye(10.75, 18, 1.5), eye(13.25, 18, 1.5)]),
  ...waves,
]
