import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { sparkle } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 星芒
export default ({ radius }) => [
  rounded(folder, radius),
  ...accent(sparkle(center, 1, radius)),
]
