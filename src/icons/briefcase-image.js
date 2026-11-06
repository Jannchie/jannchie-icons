import { center, centerScale, fillParts, plain } from '../briefcase'
import { image, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 公文包 + 图片
export default ({ radius, stroke }) => [
  ...plain(radius, stroke),
  ...accent(image(center, centerScale * visual.image, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(image(center, centerScale * visual.image, radius)),
])
