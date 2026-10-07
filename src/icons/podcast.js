import { circle } from '../geometry'

// 播客：中心的麦克风头（圆心 (12.5, 9.5)、半径 2）+ 两道底部开口 90° 的同心弧（半径 5 / 8.5）+ 从圆底伸下的支杆
// 支杆沿径向接在圆周上，竖线落在 12.5
const [cx, cy] = [12.5, 9.5]
const arc = (r) => {
  const d = r * Math.SQRT1_2
  return `M${+(cx - d).toFixed(3)} ${+(cy + d).toFixed(3)}A${r} ${r} 0 1 1 ${+(cx + d).toFixed(3)} ${+(cy + d).toFixed(3)}`
}
export default () => [
  circle(cx, cy, 2),
  arc(5),
  arc(8.5),
  `M${cx} ${cy + 2}V21.5`,
]
