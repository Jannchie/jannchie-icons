import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { ban } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 禁止
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...danger(ban(center, 1, radius)),
]
