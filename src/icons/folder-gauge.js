import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { gauge } from '../symbols'
import { info } from '../tone'

// 文件夹 + 计速器
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...info(gauge(center, 1, radius)),
]
