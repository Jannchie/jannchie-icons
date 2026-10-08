import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { cloud } from '../symbols'
import { info } from '../tone'

// 文件夹 + 云
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...info(cloud(center, 1, radius)),
]
