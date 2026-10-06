import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { music } from '../symbols'

// 音乐文件夹
export default ({ radius }) => [
  rounded(folder, radius),
  ...music(center, 1, radius),
]
