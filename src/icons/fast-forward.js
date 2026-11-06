import { rounded } from '../geometry'
import { triangle } from '../media'
import { solid } from '../solid'

// 快进：两个 30° 三角，前一个挡住后一个的尖，高约 12（和下一首一样大）
// 竖边落在 3.5 / 10.5；后一个只画到前一个底边前，断口随描边加宽，墨迹间留 0.75
const w = 10.5
const h = 2 * w * Math.tan(Math.PI / 6)
const back = 3.5
const front = 10.5
// 后一个三角在 x 处的半高
const half = x => h / 2 * (1 - (x - back) / w)
const cutOf = stroke => front - stroke - 0.75
const behind = (cut, radius) => rounded([[cut, 12 - half(cut)], [back, 12 - h / 2], [back, 12 + h / 2], [cut, 12 + half(cut)]], radius)

export default ({ radius, stroke }) => {
  const cut = cutOf(stroke)
  return [
    // 开口：后一个三角被挡住的一侧不封口
    `M${cut} ${12 - half(cut)}L${back} ${12 - h / 2}V${12 + h / 2}L${cut} ${12 + half(cut)}`,
    rounded(triangle(front, h), radius),
  ]
}

// 实心：后一个截成梯形，和前一个隔开
export const fill = ({ radius, stroke }) => solid([
  behind(cutOf(stroke), radius),
  rounded(triangle(front, h), radius),
])
