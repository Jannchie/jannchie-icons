import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { ban, visual } from '../symbols'
import { danger } from '../tone'

// 文件夹 + 禁止
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...danger(ban(center, centerScale * visual.ban, radius)),
]
