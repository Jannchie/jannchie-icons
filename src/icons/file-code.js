import { center, centerScale, fillParts, flap, page } from '../file'
import { rounded } from '../geometry'
import { code, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// < > 横向很宽：纸张 15 宽（内部 12），按 1.3 倍放在粗字重下会贴到纸的两边，这里缩到 0.92 倍
const SCALE = centerScale * 0.92 * visual.code

// 文件 + 代码
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(code(center, SCALE, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(code(center, SCALE, radius)),
])
