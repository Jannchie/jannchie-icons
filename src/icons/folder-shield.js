import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { shield, visual } from '../symbols'
import { success } from '../tone'

// 文件夹 + 盾
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...success(shield(center, centerScale * visual.shield, radius)),
]
