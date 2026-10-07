import { rounded } from '../geometry'
import { speaker } from '../media'

// 低音量：喇叭 + 一道 ±45° 的声波弧（和 volume 的内圈那道相同）
const [cx, cy, r] = [12.5, 12, 3.5]
const d = r * Math.SQRT1_2

export default ({ radius }) => [
  rounded(speaker, radius),
  `M${cx + d} ${cy - d}A${r} ${r} 0 0 1 ${cx + d} ${cy + d}`,
]
