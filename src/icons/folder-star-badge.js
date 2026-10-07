import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, star } from '../symbols'
import { warning } from '../tone'

// 文件夹 + 右下角收藏
const k = cornerScale.star

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.star, badge, k), stroke), radius, false),
  ...warning(star(badge, k, radius)),
]
