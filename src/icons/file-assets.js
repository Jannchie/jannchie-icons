import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { assets, visual } from '../symbols'
import { accent } from '../tone'

// 文件 + 素材
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(assets(center, centerScale * visual.assets, radius)),
]
