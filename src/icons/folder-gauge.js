import { rounded } from '../geometry'
import { center, centerScale, fillParts, folder } from '../folder'
import { gauge, visual } from '../symbols'
import { info } from '../tone'
import { centerFill } from '../solid'

// 文件夹 + 计速器
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...info(gauge(center, centerScale * visual.gauge, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...info(gauge(center, centerScale * visual.gauge, radius)),
])
