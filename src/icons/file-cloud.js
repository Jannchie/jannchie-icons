import { center, flap, page } from '../file'
import { rounded } from '../geometry'
import { cloud } from '../symbols'

// 文件 + 云
export default ({ radius }) => [
  rounded(page(radius), radius),
  flap,
  ...cloud(center, 1, radius),
]
