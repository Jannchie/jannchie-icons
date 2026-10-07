import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { music } from '../symbols'
import { accent } from '../tone'

// 音乐文件夹
export default ({ radius }) => [
  rounded(folder, radius),
  ...accent(music(center, 1, radius)),
]
