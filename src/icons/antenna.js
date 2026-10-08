import { circle } from '../geometry'

// 天线：V 形振子 + 振子汇合处的小圆接头（圆心 (12, 9.5)、半径 1.5）+ 竖杆 + 底座
// 振子两臂指向圆心、竖杆从圆底伸出，都沿径向接在圆周上；竖杆垂直接在底座横线上
const [cx, cy, r] = [12, 9.5, 1.5]
const arm = (x, y) => {
  const l = Math.hypot(x - cx, y - cy)
  return `M${x} ${y}L${+(cx + (x - cx) / l * r).toFixed(3)} ${+(cy + (y - cy) / l * r).toFixed(3)}`
}
export default () => [
  circle(cx, cy, r),
  arm(5, 3.5),
  arm(19, 3.5),
  `M${cx} ${cy + r}V20.5`,
  'M8 20.5H16',
]
