import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { puzzle, visual } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 拼图（模组）
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(puzzle(center, centerScale * visual.puzzle, radius)),
]
