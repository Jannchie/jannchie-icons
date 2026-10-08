import { rounded } from '../geometry'
import { center, folder, centerScale } from '../folder'
import { video, visual } from '../symbols'
import { accent } from '../tone'

// 视频文件夹
export default ({ radius, stroke }) => [
  rounded(folder(stroke), radius),
  ...accent(video(center, centerScale * visual.video, radius)),
]
