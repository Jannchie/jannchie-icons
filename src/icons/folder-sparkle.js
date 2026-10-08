import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { sparkle, visual } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 星芒
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(sparkle(center, centerScale * visual.sparkle, radius)),
]
