import { center, centerScale, fillParts, flap, page } from '../file'
import { rounded } from '../geometry'
import { cloud, visual } from '../symbols'
import { info } from '../tone'
import { centerFill } from '../solid'

// 云是横向最宽的符号：纸张 15 宽（内部 12），按 1.3 倍放会贴到纸的两边，这里缩到 0.88 倍，常规线宽下两边各留 0.5 以上
const SCALE = centerScale * 0.88 * visual.cloud

// 文件 + 云
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...info(cloud(center, SCALE, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...info(cloud(center, SCALE, radius)),
])
