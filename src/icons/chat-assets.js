import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { assets, visual } from '../symbols'
import { accent } from '../tone'

// 对话 + 素材
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...accent(assets(center, centerScale * visual.assets, radius)),
]
