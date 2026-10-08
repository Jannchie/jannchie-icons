import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { gauge, visual } from '../symbols'
import { info } from '../tone'

// 文件夹 + 计速器
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...info(gauge(center, centerScale * visual.gauge, radius)),
]
