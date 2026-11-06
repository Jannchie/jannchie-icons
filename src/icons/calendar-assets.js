import { base, center, centerScale, fillParts } from '../calendar'
import { assets, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 日历 + 素材
export default ({ radius, stroke }) => [
  ...base(radius, stroke),
  ...accent(assets(center, centerScale * visual.assets, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(assets(center, centerScale * visual.assets, radius)),
])
