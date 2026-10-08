import { center, flap, page, centerScale } from '../file'
import { rounded } from '../geometry'
import { bookmark, visual } from '../symbols'
import { accent } from '../tone'

// 文件 + 书签
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(bookmark(center, centerScale * visual.bookmark, radius)),
]
