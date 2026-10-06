import { rounded } from '../geometry'
import { speaker } from '../media'

// 静音：喇叭 + 45° 叉
const c = [18, 12]
const s = 2.5

export default ({ radius }) => [
  rounded(speaker, radius),
  `M${c[0] - s} ${c[1] - s}L${c[0] + s} ${c[1] + s}`,
  `M${c[0] + s} ${c[1] - s}L${c[0] - s} ${c[1] + s}`,
]
