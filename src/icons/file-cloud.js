import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { cloud } from '../symbols'
import { info } from '../tone'

// 文件 + 云
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...info(cloud(center, 1, radius)),
]
