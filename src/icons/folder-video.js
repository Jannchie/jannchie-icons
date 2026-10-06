import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { video } from '../symbols'

// 视频文件夹
export default ({ radius }) => [
  rounded(folder, radius),
  ...video(center, 1, radius),
]
