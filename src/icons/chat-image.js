import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { image, visual } from '../symbols'
import { accent } from '../tone'

// 对话 + 图片
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(image(center, centerScale * visual.image, radius)),
]
