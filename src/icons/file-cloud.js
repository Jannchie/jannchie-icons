import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { cloud } from '../symbols'
import { info } from '../tone'

// 文件 + 云
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...info(cloud(center, 1, radius)),
]
