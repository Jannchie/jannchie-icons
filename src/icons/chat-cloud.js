import { bubble, center, centerScale } from '../chat'
import { rounded } from '../geometry'
import { cloud, visual } from '../symbols'
import { info } from '../tone'

// 对话 + 云
export default ({ radius, stroke }) => [
  rounded(bubble(stroke), radius, false),
  ...info(cloud(center, centerScale * visual.cloud, radius)),
]
