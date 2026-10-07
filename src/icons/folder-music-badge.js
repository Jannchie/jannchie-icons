import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, music } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右下角音乐
const k = cornerScale.music

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.music, badge, k), stroke), radius, false),
  ...accent(music(badge, k, radius)),
]
