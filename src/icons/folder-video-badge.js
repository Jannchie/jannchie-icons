import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, video } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右下角视频
const k = cornerScale.video

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.video, badge, k), stroke), radius, false),
  ...accent(video(badge, k, radius)),
]
