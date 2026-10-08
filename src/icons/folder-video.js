import { rounded } from '../geometry'
import { center, folder } from '../folder'
import { video } from '../symbols'
import { accent } from '../tone'

// 视频文件夹
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(video(center, 1, radius)),
]
