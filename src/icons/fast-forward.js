import { rounded } from '../geometry'
import { triangle } from '../media'

// 快进：两个三角一前一后，整体居中
// 每个三角宽 7，高按 30° 反推；两条竖边落在 4.5 / 13.5 上：后一个三角的尖被圆角削掉一截，几何外框 4.5–20.5 右偏半格，墨迹才左右居中
// 前一个的尖和后一个的竖边隔 2——首尾相接时尖会糊进竖边里
const w = 7
const h = w * 2 * Math.tan(Math.PI / 6)
const left = 4.5

export default ({ radius }) => [
  rounded(triangle(left, h), radius),
  rounded(triangle(left + w + 2, h), radius),
]
