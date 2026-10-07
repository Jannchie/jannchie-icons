import { place } from '../clearance'
import { rounded } from '../geometry'
import { badge, folderAround } from '../folder'
import { cornerScale, outlines, sparkle } from '../symbols'
import { accent } from '../tone'

// 文件夹 + 右下角星芒
const k = cornerScale.sparkle

export default ({ radius, stroke }) => [
  rounded(folderAround(place(outlines.sparkle, badge, k), stroke), radius, false),
  ...accent(sparkle(badge, k, radius)),
]
