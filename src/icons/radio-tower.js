import { crisp, rounded } from '../geometry'
import { dot } from '../scene'

// 信号塔：顶上一个发射点 (12, 6.5) + 左右各两道 ±45° 的信号弧（半径 3.5 / 6.5）+ 下面闭合的三角塔身（顶 10、底 20.5、底宽 10）
// 塔身顶角约 51°：底宽 8 时只有约 41°，粗字重下塔身被线宽填满
const [cx, cy] = [12, 6.5]
const wave = (r, s) => {
  const d = r * Math.SQRT1_2
  return `M${cx + s * d} ${cy - d}A${r} ${r} 0 0 ${s > 0 ? 1 : 0} ${cx + s * d} ${cy + d}`
}
export default ({ radius }) => [
  dot(cx, cy, 3),
  wave(3.5, 1),
  wave(6.5, 1),
  wave(3.5, -1),
  wave(6.5, -1),
  rounded([[12, 10, crisp(radius)], [17, 20.5], [7, 20.5]], Math.min(radius, 1)),
]
