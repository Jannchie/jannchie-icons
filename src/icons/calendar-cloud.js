import { base, center, centerScale, fillParts } from '../calendar'
import { cloud, visual } from '../symbols'
import { info } from '../tone'
import { centerFill } from '../solid'

// 日历 + 云
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...info(cloud(center, centerScale * visual.cloud, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...info(cloud(center, centerScale * visual.cloud, radius)),
])
