import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { image } from '../symbols'

// 图片文件夹
export default ({ radius }) => [
  rounded(folder, radius),
  ...image(center, 1, radius),
]
