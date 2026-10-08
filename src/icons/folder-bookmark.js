import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 书签文件夹
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(bookmark(center, 1, radius)),
]
