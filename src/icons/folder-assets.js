import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { assets } from '../symbols'
import { accent } from '../tone'

// 素材文件夹
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(assets(center, 1, radius)),
]
