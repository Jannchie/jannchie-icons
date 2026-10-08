import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { minus } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 减号
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...danger(minus(center)),
]
