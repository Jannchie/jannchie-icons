import { rounded } from '../geometry'
import { center, centerScale, folder } from '../folder'
import { check, visual } from '../symbols'
import { success } from '../tone'

// 文件夹 + 勾
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...success(check(center, centerScale * visual.check, radius)),
]
