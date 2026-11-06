import { center, centerScale, fillParts, flap, page } from '../file'
import { rounded } from '../geometry'
import { bookmark, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 文件 + 书签
export default ({ radius, stroke }) => [
  rounded(page(stroke, radius), radius),
  flap(stroke),
  ...accent(bookmark(center, centerScale * visual.bookmark, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(bookmark(center, centerScale * visual.bookmark, radius)),
])
