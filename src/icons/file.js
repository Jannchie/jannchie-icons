import { fillParts, flap, page } from '../file'
import { rounded } from '../geometry'
import { plainFill } from '../solid'

// 文件：纸张 + 右上折角
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
]

// 实心：纸张一块，挖掉翻折线（见 file.js 的 fillParts）
export const fill = ({ radius, stroke }) => plainFill(fillParts(radius, stroke))
