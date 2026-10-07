import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { ring } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 圆
export default ({ radius }) => [
  rounded(folder, radius),
  ...accent(ring(center)),
]
