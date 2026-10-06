import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { bookmark } from '../symbols'

// 书签文件夹
export default ({ radius }) => [
  rounded(folder, radius),
  ...bookmark(center, 1, radius),
]
