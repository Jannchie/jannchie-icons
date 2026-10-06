import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, ban } from '../symbols'

// 文件夹 + 右下角禁止
const k = cornerScale.ban

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.ban, badge, k), stroke), radius, false),
  ...ban(badge, k, radius),
]
