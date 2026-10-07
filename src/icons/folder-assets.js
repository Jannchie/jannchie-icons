import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { assets } from '../symbols'
import { accent } from '../tone'

// 素材文件夹
export default ({ radius }) => [
  rounded(folder, radius),
  ...accent(assets(center, 1, radius)),
]
