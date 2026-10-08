import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { check } from '../symbols'
import { success } from '../tone'

// 文件夹 + 勾
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...success(check(center)),
]
