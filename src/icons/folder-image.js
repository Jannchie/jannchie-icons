import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { image } from '../symbols'
import { accent } from '../tone'

// 图片文件夹
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(image(center, 1, radius)),
]
