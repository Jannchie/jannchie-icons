import { bubble, center } from '../chat'
import { rounded } from '../geometry'
import { arrowRight } from '../symbols'
import { info } from '../tone'

// 对话 + 右箭头
export default ({ radius }) => [
  rounded(bubble(radius), radius, false),
  ...info(arrowRight(center, 1, radius)),
]
