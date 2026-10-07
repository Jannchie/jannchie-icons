import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { bookmark } from '../symbols'
import { accent } from '../tone'

// 书签文件夹
export default ({ radius }) => [
  rounded(folder, radius),
  ...accent(bookmark(center, 1, radius)),
]
