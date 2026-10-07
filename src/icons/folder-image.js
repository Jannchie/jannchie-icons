import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { image } from '../symbols'
import { accent } from '../tone'

// 图片文件夹
export default ({ radius }) => [
  rounded(folder, radius),
  ...accent(image(center, 1, radius)),
]
