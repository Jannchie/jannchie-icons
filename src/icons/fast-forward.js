import { rounded } from '../geometry'
import { triangle } from '../media'

// 快进：两个三角首尾相接，整体居中
// 每个三角宽取整数 9，两条竖边落在 3.5 / 12.5 上（整体右移半格），高按 30° 反推
const w = 9
const h = w * 2 * Math.tan(Math.PI / 6)
const left = 3.5

export default ({ radius }) => [
  rounded(triangle(left, h), radius),
  rounded(triangle(left + w, h), radius),
]
