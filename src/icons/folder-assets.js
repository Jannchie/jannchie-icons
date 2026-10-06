import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { assets } from '../symbols'

// 素材文件夹
export default ({ radius }) => [
  rounded(folder, radius),
  ...assets(center, 1, radius),
]
