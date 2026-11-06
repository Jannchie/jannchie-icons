import { rounded } from '../geometry'
import { speaker } from '../media'
import { solid } from '../solid'
import { danger } from '../tone'

// 静音：喇叭 + 45° 叉
const c = [17.5, 12]
const s = 2.5

export default ({ radius }) => [
  rounded(speaker, radius),
  ...danger([
    `M${c[0] - s} ${c[1] - s}L${c[0] + s} ${c[1] + s}`,
    `M${c[0] + s} ${c[1] - s}L${c[0] - s} ${c[1] + s}`,
  ]),
]

// 实心：喇叭填实，叉照旧是线
export const fill = ({ radius }) => [
  solid(rounded(speaker, radius)),
  ...danger([
    `M${c[0] - s} ${c[1] - s}L${c[0] + s} ${c[1] + s}`,
    `M${c[0] + s} ${c[1] - s}L${c[0] - s} ${c[1] + s}`,
  ]),
]
