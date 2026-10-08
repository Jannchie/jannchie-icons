import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { bookmark, visual } from '../symbols'
import { accent } from '../tone'

// 书签文件夹
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(bookmark(center, centerScale * visual.bookmark, radius)),
]
