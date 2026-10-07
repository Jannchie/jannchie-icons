import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { minus } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 减号
export default ({ radius }) => [
  rounded(folder, radius),
  ...danger(minus(center)),
]
