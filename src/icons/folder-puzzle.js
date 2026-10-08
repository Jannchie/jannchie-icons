import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { puzzle } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 拼图（模组）
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(puzzle(center, 1, radius)),
]
