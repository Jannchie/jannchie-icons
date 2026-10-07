import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 拼图（模组）
export default ({ radius }) => [
  rounded(folder, radius),
  ...accent(puzzle(center, 1, radius)),
]
