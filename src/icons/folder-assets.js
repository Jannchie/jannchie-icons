import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { assets, visual } from '../symbols'
import { accent } from '../tone'

// 素材文件夹
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(assets(center, centerScale * visual.assets, radius)),
]
