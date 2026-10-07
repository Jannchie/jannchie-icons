import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { heart } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 爱心
export default ({ radius }) => [
  rounded(folder, radius),
  ...danger(heart(center, 1, radius)),
]
