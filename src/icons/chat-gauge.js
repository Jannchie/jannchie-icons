import { bubble, center, centerScale, fillParts } from '../chat'
import { rounded } from '../geometry'
import { gauge, visual } from '../symbols'
import { info } from '../tone'
import { centerFill } from '../solid'

// 对话 + 计速器
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...info(gauge(center, centerScale * visual.gauge, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...info(gauge(center, centerScale * visual.gauge, radius)),
])
