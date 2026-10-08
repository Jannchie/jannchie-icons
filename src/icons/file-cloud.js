import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { cloud, visual } from '../symbols'
import { info } from '../tone'

// 文件 + 云
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...info(cloud(center, centerScale * visual.cloud, radius)),
]
