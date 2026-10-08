import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { image, visual } from '../symbols'
import { accent } from '../tone'

// 图片文件夹
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(image(center, centerScale * visual.image, radius)),
]
