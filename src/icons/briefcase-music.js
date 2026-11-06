import { center, centerScale, fillParts, plain } from '../briefcase'
import { music, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 公文包 + 音乐
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(music(center, centerScale * visual.music, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(music(center, centerScale * visual.music, radius)),
])
