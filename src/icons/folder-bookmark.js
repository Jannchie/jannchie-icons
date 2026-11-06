import { rounded } from '../geometry'
import { center, centerScale, fillParts, folder } from '../folder'
import { bookmark, visual } from '../symbols'
import { accent } from '../tone'
import { centerFill } from '../solid'

// 书签文件夹
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(bookmark(center, centerScale * visual.bookmark, radius)),
]

// 实心：主体填实，挖掉居中的符号
export const fill = ({ radius, stroke }) => centerFill(fillParts(radius, stroke), [
  ...accent(bookmark(center, centerScale * visual.bookmark, radius)),
])
