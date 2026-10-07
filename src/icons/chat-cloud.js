import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { cloud } from '../symbols'
import { info } from '../tone'

// 对话 + 云
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...info(cloud(center, 1, radius)),
]
