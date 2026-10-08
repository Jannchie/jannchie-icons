import { rounded } from '../geometry'
import { folder } from '../folder'

// 文件夹
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
]
