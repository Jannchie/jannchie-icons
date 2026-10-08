import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { cloud, visual } from '../symbols'
import { info } from '../tone'

// 文件夹 + 云
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...info(cloud(center, centerScale * visual.cloud, radius)),
]
